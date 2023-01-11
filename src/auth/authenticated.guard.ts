import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const requ = context.switchToHttp().getRequest();
    console.log(requ.isAuthenticated());
    return true;
  }
}
