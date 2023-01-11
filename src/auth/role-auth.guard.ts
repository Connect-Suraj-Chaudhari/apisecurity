import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../user-roles.enum';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //auth guard Request.from header

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRoles[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp();
    const user = request.getRequest<Request>();
    console.log(roles);
    console.log('header', user.header('roles'));
    if(!roles){
      return true;
    }
    if (user.header('roles') === undefined) {
      return false;
    }
    let user_role: any = user.header('roles');
    console.log(user_role);

    return roles.includes(user_role);
  }

  // auth guard Request.from Body

  // canActivate(context: ExecutionContext): boolean {
  //   const roles = this.reflector.get<UserRoles[]>(
  //     'roles',
  //     context.getHandler(),
  //   );
  //   console.log(roles, 'rolllesd');
  //   if (!roles) {
  //     return true;
  //   }

  //   const request = context.switchToHttp().getRequest();
  //   const user = request.body;
  //   console.log(user, 'testtt');
  //   if (!user.roles) return false;
  //   return roles.includes(user.roles);
  // }
}
