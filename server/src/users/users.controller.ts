import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User | undefined> {
    return this.usersService.createUser(createUserDto);
  }
}
