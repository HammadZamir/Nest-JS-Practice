import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';

@Controller('users-auth')
export class UsersAuthController {
    constructor(private readonly usersAuthService: UsersAuthService) { }

    @Post('signup')
    async registerUser(@Body("firstName") firstName: string, @Body("lastName") lastName: string, @Body("email") email: string, @Body("password") password: string, @Body("categoryId") categoryId: number) {
        try {
            const user = await this.usersAuthService.registerUser(firstName, lastName, email, password, categoryId)
            return user;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "User with this email already exists"
                }, HttpStatus.BAD_REQUEST, {
                    cause: error
                }
            )
        }
    }
}
