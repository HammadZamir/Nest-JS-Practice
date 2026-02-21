import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Users } from './users.interface';
import { UsersService } from './users.service';
import { response } from 'express';
import { UsersCategory } from 'src/users-category/users-category.entity';
import { HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get("")
    getAllUsers() {
        try {


            const users = this.userService.getAllUsers()
            return users;
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error in getting users',
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }

    @Post()
    async createUser(@Body("firstName") firstName: string, @Body("lastName") lastName: string, @Body("category") category: UsersCategory) {
        const user = this.userService.createUser(firstName, lastName, category)
        await console.log("User created : ", user)
        return user;
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        try {
            const deletedUser = await this.userService.remove(id)
            return deletedUser.affected === 1 ? {
                status: HttpStatus.OK,
                message: "User deleted successfully"
            } : {
                status: HttpStatus.NOT_FOUND,
                message: "User with this id not found"
            }
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "User with this id not found"
                }, HttpStatus.NOT_FOUND, {
                    cause: error
                }
            )

        }
    }

}
