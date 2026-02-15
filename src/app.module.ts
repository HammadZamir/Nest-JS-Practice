import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AnimalsModule} from './animals/animals.module';
import { VouchersController } from './vouchers/vouchers.controller';
import { VouchersService } from './vouchers/vouchers.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AnimalsModule, UsersModule],
  controllers: [AppController, VouchersController, UsersController],
  providers: [AppService, VouchersService, UsersService],
})
export class AppModule {}
