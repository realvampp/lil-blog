import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'
import { LocalStrategy } from './local/local.strategy'
import { JwtStrategy } from './jwt/jwt.strategy'

@Module({
  imports: [JwtModule.register({}), PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
