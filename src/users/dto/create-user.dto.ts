import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'test_user', description: 'User name' })
  @IsString()
  username: string

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString()
  @MinLength(4)
  password: string
}
