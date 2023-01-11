import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles.decorators';
import { UserRoles } from './user-roles.enum';
import { RolesGuard } from './auth/role-auth.guard';
@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  //post login
  // @Roles(UserRoles.ADMIN)
  // @UseGuards(RolesGuard)
  // @Roles(UserRoles.ADMIN)
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req ,  ): any {
    console.log(req.body);
    
    return this.authService.login(req.body); // TODO: return JWT access token
  }

  //post login
  @Roles(UserRoles.ADMIN)
  @UseGuards(LocalAuthGuard)
  @Post('login2')
  login2(@Request() req): any {
    return this.authService.login(req.user); // TODO: return JWT access token
  }

  //GET protected
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('protected')
  getHello(@Request() req): any {
    //TODO: require an bearer token, validate token
    return req.user;
  }
}
