import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UsersAuthService } from './users-auth.service';
import { UsersAuthController } from './users-auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), UsersModule],
    providers: [UsersAuthService],
    controllers: [UsersAuthController],
})
export class UsersAuthModule {}
