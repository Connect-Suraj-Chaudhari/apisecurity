import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/role-auth.guard';

@Module({
  imports: [UsersModule],
  providers: [
    UsersService,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
