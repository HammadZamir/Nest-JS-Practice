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
    async createUser(@Body("firstName") firstName: string, @Body("lastName") lastName: string, @Body("categoryId") categoryId: number) {
        const user = await this.userService.createUser(firstName, lastName, categoryId)
        console.log("User created : ", user)
        return user;
    }

    @Get(":id")
    async getOneUser(@Param("id", ParseIntPipe) id: string){
        try {
            const user = await this.userService.findOne(parseInt(id))
            return user;
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

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        try {
            const deletedUser = await this.userService.deleteUser(id)
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
