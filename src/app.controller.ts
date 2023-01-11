import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';



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
    return req.user;
  }


  @UseGuards(JwtAuthGuard)
  @Post('/admin/protected')
  adminFun(){
    return 'success'
  }
  @UseGuards(JwtAuthGuard)
  @Post('/superadmin/protected')
  superAdminFun(){
    return 'success'
  }
  @UseGuards(JwtAuthGuard)
  @Post('/merchant/protected')
  merchantFun(){
    return 'success'
  }
}
