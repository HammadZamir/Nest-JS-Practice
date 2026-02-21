
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
  ) {}

  getAllUsers(){
    return this.usersRepository.find({relations: ['category']});
  }

  createUser(firstName: string, lastName: string, category: UsersCategory){
    const newUser = this.usersRepository.save(({firstName, lastName, category}))
    return newUser;
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
