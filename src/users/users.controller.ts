import { Body, Controller, Get } from '@nestjs/common';
import { Users } from './users.interface';

@Controller('users')
export class UsersController {
    @Get()
    getAllUsers(@Body() validateUserDto: Users){

    }

}
