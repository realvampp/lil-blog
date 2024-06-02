import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    const post = await this.userRepository.findOneBy({ id })
    if (!post) {
      throw new BadRequestException('User not found')
    }

    return post
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const post = await this.userRepository.findOneBy({ id })
    if (!post) {
      throw new BadRequestException('User not found')
    }

    try {
      await this.userRepository.update({ id }, updateUserDto)
    } catch (error) {
      throw new BadRequestException('Failed to update user')
    }

    return { success: true }
  }

  async remove(id: number) {
    const post = await this.userRepository.findOneBy({ id })
    if (!post) {
      throw new BadRequestException('User not found')
    }

    await this.userRepository.delete({ id })
    return { success: true }
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }
}
