import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users-auth')
export class UsersAuthController {
    constructor(private readonly usersAuthService: UsersAuthService) { }

    @Post('signup')
    async registerUser(@Body('firstName') firstName: string, @Body('lastName') lastName: string, @Body('email') email: string, @Body('password') password: string, @Body('categoryId') categoryId: number) {
        try {
            const user = await this.usersAuthService.registerUser(firstName, lastName, email, password, categoryId)
            return user
        } catch (error) {
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'User with this email already exists' },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            )
        }
    }

    @Post('signin')
    async signinUser(@Body('email') email: string, @Body('password') password: string) {
        const { user, accessToken, refreshToken } = await this.usersAuthService.signinUser(email, password)
        return { user, accessToken, refreshToken }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: { user: { userId: number; email: string } }) {
        return req.user
    }
}
