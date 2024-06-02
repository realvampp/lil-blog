import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NeedAdmin } from '../auth/decorators/need-admin.decorator'

@ApiBearerAuth()
@ApiTags('Users')
@NeedAdmin(true)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @NeedAdmin(false)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
