import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compare(pass, user.password)) {
      console.log("validateUser > user:", user)
      const result = {
        _id: user._id,
        username: user.username,
        role: user.role
      }
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id, role: user.role};
    console.log("login payload", payload);
    return this.jwtService.sign(payload);
  }
}
