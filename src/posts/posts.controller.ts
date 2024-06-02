import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity'

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as User
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single post' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    const user = req.user as User
    return this.postsService.update(+id, updatePostDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User
    return this.postsService.remove(+id, user);
  }
}
