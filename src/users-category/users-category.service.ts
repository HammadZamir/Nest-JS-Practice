import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersCategory } from './users-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersCategoryService {
    constructor(
        @InjectRepository(UsersCategory)
        private usersCategoryRepository: Repository<UsersCategory>,
    ) { }

    getAllCategories() {
        return this.usersCategoryRepository.find();
    }

    createCategory(name: string, description: string) {
        const category = this.usersCategoryRepository.save({ name, description })
        return category;
    }
}
