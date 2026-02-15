import { Body, Controller, Get } from '@nestjs/common';
import { Users } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){ }
    
    @Get()
    getAllUsers(@Body() validateUserDto: any){
        
    }

}
