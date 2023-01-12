import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user && user.password === password) {
      const { password, username, ...rest } = user;
      console.log(user);
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, roles: user.roles, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(user: any) {
    return user;
  }
}
