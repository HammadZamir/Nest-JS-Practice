import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersCategoryService } from './users-category.service';

@Controller('users-category')
export class UsersCategoryController {
    constructor( private readonly usersCategoryService: UsersCategoryService){ }

    @Get()
    getAllCategories(){
        const categories = this.usersCategoryService.getAllCategories()
        return categories;
    }

    @Post()
    createCategory(@Body("name") name: string, @Body("description") description: string){
        const category = this.usersCategoryService.createCategory(name, description)
        return category;
    }
}
