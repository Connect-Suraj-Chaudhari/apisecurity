import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constant';

export class JwtStratgey extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, //TODO: add this in env variables
    });
  }
  async validate(payload: any) {
    // const user = await this.userService.getById(payload.sub);
     return {
     id:payload.sub,
     name: payload.name,
     roles: payload.roles
    };
  }
}
