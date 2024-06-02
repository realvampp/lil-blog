import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ example: 'My title', description: 'Title of the post' })
  @IsString()
  title: string

  @ApiProperty({ example: 'My content', description: 'Content of the post' })
  @IsString()
  content: string
}
