import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../constant';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStratgey } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret:jwtConstants.secret, //TODO put in env variable
    signOptions:{expiresIn:'60s'},
  })],
  providers: [AuthService, LocalStrategy, JwtStratgey],
exports:[AuthService]

  // imports: [UsersModule, PassportModule.register({ session: true })],
  // providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
