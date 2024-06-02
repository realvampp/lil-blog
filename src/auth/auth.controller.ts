import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { RefreshRequestDto } from './dto/refresh-request.dto'
import { Public } from './decorators/public.decorator'

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Login user' })
  login(@Req() req: Request) {
    const user = req.user as User
    return this.authService.login(user)
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  refresh(@Body() refreshToken: RefreshRequestDto) {
    return this.authService.refreshToken(refreshToken.refreshToken)
  }
}
