import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAuthService {
    constructor( 
        @InjectRepository(Users) private usersRepository: Repository<Users>, 
    ) {}

    async registerUser (firstName: string, lastName: string, email: string, password: string, categoryId: number){
        const user = await this.usersRepository.save({ firstName, lastName, email, password, categoryId })
        return user;

    }
}
