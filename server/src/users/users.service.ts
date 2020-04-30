
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ "username": username }).exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    let newUser = {
      username: createUserDto.username,
      password: hash,
      role: createUserDto.role
    }
    const createdUser = await new this.userModel(newUser).save();
    return { 
      _id: createdUser._id,
      username: createdUser.username,
      role: createdUser.role
    }
  }

}