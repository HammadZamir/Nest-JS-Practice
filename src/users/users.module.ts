import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersCategory } from '../users-category/users-category.entity';
import { UsersCategoryModule } from '../users-category/users-category.module';

@Module({
    imports: [TypeOrmModule.forFeature([Users, UsersCategory]), UsersCategoryModule],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
