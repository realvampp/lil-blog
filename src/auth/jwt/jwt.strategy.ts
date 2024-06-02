import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { LoginUserDto } from '../dto/login-user.dto'
import { UsersService } from '../../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.accessTokenSecret'),
    })
  }

  async validate(payload: LoginUserDto) {
    const user = await this.userService.findOne(payload.id)
    if (!user || user.username !== payload.username) {
      throw new UnauthorizedException()
    }
    return user
  }
}
