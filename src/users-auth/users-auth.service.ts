import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAuthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private jwtService: JwtService,
    ) { }

    async registerUser(firstName: string, lastName: string, email: string, password: string, categoryId: number) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.usersRepository.save({
            firstName,
            lastName,
            email,
            password: hashPassword,
            category: { id: categoryId }
        })
        return user;
    }

    async signinUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'firstName', 'lastName', 'password', 'isActive'] })
        if (!user) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'User with this email not found' },
                HttpStatus.BAD_REQUEST,
            )
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Password is incorrect' },
                HttpStatus.BAD_REQUEST,
            )
        }
        const { accessToken, refreshToken } = this.getTokens(user)
        const { password: _, ...userWithoutPassword } = user
        return { user: userWithoutPassword, accessToken, refreshToken }
    }

    getTokens(user: Users) {
        const payload = { sub: user.id, email: user.email }
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })
        return { accessToken, refreshToken }
    }
}
