import { ApiProperty } from '@nestjs/swagger'

export class RefreshRequestDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cC...',
  })
  readonly refreshToken: string;
}