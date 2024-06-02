import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  create(createPostDto: CreatePostDto, user: User) {
    return this.postRepository.save({ ...createPostDto, user })
  }

  findAll() {
    return this.postRepository.find()
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneBy({ id })
    if (!post) {
      throw new BadRequestException('Post not found')
    }

    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.checkForPostOwnership(id, user.id, user.isAdmin)

    try {
      await this.postRepository.update({ id }, updatePostDto)
    } catch (error) {
      throw new BadRequestException('Failed to update post')
    }

    return { success: true }
  }

  async remove(id: number, user: User) {
    const post = await this.checkForPostOwnership(id, user.id, user.isAdmin)

    await this.postRepository.delete({ id })
    return { success: true }
  }

  async checkForPostOwnership(postId: number, userId: number, userIsAdmin: boolean) {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: { user: true } })
    if (!post) {
      throw new BadRequestException('Post not found')
    }

    const user = post.user
    if (!userIsAdmin && user.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this post')
    }

    return post
  }
}
