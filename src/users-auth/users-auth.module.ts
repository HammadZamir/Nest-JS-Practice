import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'src/users/users.entity';
import { UsersAuthService } from './users-auth.service';
import { UsersAuthController } from './users-auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret-key',
            signOptions: { expiresIn: '15m' },
        }),
    ],
    providers: [UsersAuthService, JwtStrategy],
    controllers: [UsersAuthController],
})
export class UsersAuthModule {}
