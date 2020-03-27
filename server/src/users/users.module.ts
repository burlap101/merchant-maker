import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user/user.controller';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController, UsersController]
})
export class UsersModule {}
