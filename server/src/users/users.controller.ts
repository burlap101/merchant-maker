import { Controller, Post, Body, UseGuards, Get, Param, Request, HttpException, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './interfaces/user.interface';
import { Roles } from './roles.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Roles('admin') 
  @Get('profile/:username')
  async getProfile(@Param() params, @Request() req): Promise<User | undefined> {
    console.log(req.user);
    if(params.username == req.user.username) {
      return this.usersService.findOne(params.username);
    } else {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }
}
