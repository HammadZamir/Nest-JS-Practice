import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { VouchersController } from './vouchers/vouchers.controller';
import { VouchersService } from './vouchers/vouchers.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Users],
      synchronize: true,
    }),
    AnimalsModule,
    UsersModule],
  controllers: [AppController, VouchersController],
  providers: [AppService, VouchersService],
})
export class AppModule {}
