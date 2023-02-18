import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { CreateTaskUserDto } from './dto/CreateTaskUser';
import { User } from 'src/typeorm/entities/User';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }

  @Post(':userId/tasks')
  async createTaskForUser(
    @Param('userId') userId: number,
    @Body() createTaskUserDto: CreateTaskUserDto,
  ): Promise<[User, CreateTaskUserDto]> {
    return this.userService.createTaskForUser(userId, createTaskUserDto);
  }
}
