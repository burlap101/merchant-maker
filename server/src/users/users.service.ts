
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  firstTimeUser = true;
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    let newUser = {
      username: createUserDto.username,
      password: hash
    }
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

}