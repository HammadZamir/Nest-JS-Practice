import { Module } from '@nestjs/common';
import { UsersCategory } from './users-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCategoryService } from './users-category.service';
import { UsersCategoryController } from './users-category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UsersCategory])],
    providers: [UsersCategoryService],
    controllers: [UsersCategoryController],
})
export class UsersCategoryModule {}
