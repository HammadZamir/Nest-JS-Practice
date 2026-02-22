
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersCategory } from 'src/users-category/users-category.entity';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(UsersCategory)
    private userCategoryRepository: Repository<UsersCategory>,
  ) {}

  getAllUsers(){
    return this.usersRepository.find({relations: ['category']});
  }

  async createUser(firstName: string, lastName: string, categoryId: number){
    const category = await this.userCategoryRepository.findOneBy({ id: categoryId });
    console.log("Found category : ", category)
    if(!category){
      return "Category with this id not found";
    }
    const newUser = await this.usersRepository.save({ firstName, lastName, category });
    return newUser;
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { id }, relations: ['category'] });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
