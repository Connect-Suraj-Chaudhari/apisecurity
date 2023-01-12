import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { use } from 'passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/role-auth.guard';
import { RolesBasedGuard } from './auth/role-based.guard';
import { Roles } from './auth/roles.decorators';
import { UserRoles } from './user-roles.enum';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Request() req): any {
    console.log(req.body);

    return this.authService.login(req.body); // TODO: return JWT access token
  }

  //GET protected
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): any {
    //TODO: require an bearer token, validate token
    console.log(req.user);
    return this.authService.validateToken(req.user);
  }
  @UseGuards(RolesBasedGuard)
  @Roles(UserRoles.SUPER_ADMIN)
  @Get('/admin/protected')
  adminFun() {
    return 'success';
  }
  @UseGuards(JwtAuthGuard)
  @Post('/superadmin/protected')
  superAdminFun() {
    return 'success';
  }
  @UseGuards(JwtAuthGuard)
  @Post('/merchant/protected')
  merchantFun() {
    return 'success';
  }
}
