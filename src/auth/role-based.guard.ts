import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from '../constant';
import { UserRoles } from '../user-roles.enum';

@Injectable()
export class RolesBasedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //auth guard Request from header token

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRoles[]>(
      'roles',
      context.getHandler(),
    );
    //  if(!roles){
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();
    // const user = request;
    console.log('controller1', roles);

    // console.log('header', user);
    if (!roles) {
      return true;
    }
    if (request.header('access_token') === undefined || null) {
      return true;
    }
    let user_token: any = request.header('access_token');
    console.log('header1', user_token);
    const jwt = require('jsonwebtoken');
    try {
      let decode: any = jwt.verify(user_token, jwtConstants.secret);
      console.log('decode', decode);
      return roles.includes(decode.roles);
    } catch (e) {
      return false;
    }
  }

  //auth guard Request.from header

  // canActivate(context: ExecutionContext): boolean {
  //   const roles = this.reflector.get<UserRoles[]>(
  //     'roles',
  //     context.getHandler(),
  //   );
  //   const request = context.switchToHttp();
  //   const user = request.getRequest<Request>();
  //   console.log(roles);
  //   console.log('header', user.header('roles'));
  //   if(!roles){
  //     return true;
  //   }
  //   if (user.header('roles') === undefined) {
  //     return false;
  //   }
  //   let user_role: any = user.header('roles');
  //   console.log(user_role);

  //   return roles.includes(user_role);
  // }
}
