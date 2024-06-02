import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username)
    if (!user) {
      throw new BadRequestException('User not found')
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      throw new BadRequestException('Password does not match')
    }
    return user
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id }
    const jwt = this.configService.get('jwt')

    return {
      access_token: this.jwtService.sign({ ...payload }, {
        secret: jwt.accessTokenSecret,
        audience: 'token:auth',
        expiresIn: jwt.accessTokenExpiration
      }),
      refresh_token: this.jwtService.sign({ ...payload }, {
        secret: jwt.refreshTokenSecret,
        audience: 'token:refresh',
        expiresIn: jwt.refreshTokenExpiration
      })
    }
  }

  async register(createUserDto: CreateUserDto) {
    const exists = await this.userService.findByUsername(createUserDto.username)
    if (exists) {
      throw new BadRequestException('User already exists')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12)
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword
    })

    return this.login(user)
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt.refreshTokenSecret'),
      })
      const user = await this.userService.findOne(decoded.id)

      if (!user) {
        new BadRequestException('User not found')
      }

      return this.login(user)
    } catch (e) {
      throw new BadRequestException('Invalid refresh token')
    }
  }
}
