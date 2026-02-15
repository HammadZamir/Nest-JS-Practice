import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from './users.interface';
import { UsersService } from './users.service';
import { response } from 'express';
import { UsersCategory } from 'src/users-category/users-category.entity';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){ }

    @Get("")
    getAllUsers(){
        const users = this.userService.getAllUsers()
        return users;
    }

    @Post()
    async createUser(@Body("firstName") firstName: string, @Body("lastName") lastName: string, @Body("category") category: UsersCategory){
        const user = this.userService.createUser(firstName, lastName, category)
        await console.log("User created : ", user)
        return user;
    }

}
