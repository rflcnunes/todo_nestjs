import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { CreateTaskUserDto } from './dto/CreateTaskUser';
import { User } from 'src/typeorm/entities/User';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.createUser(createUserDto);

    const { username } = response;

    return `User ${username} created`;
  }

  @Post(':userId/tasks')
  @UseGuards(JwtAuthGuard)
  async createTaskForUser(
    @Param('userId') userId: number,
    @Body() createTaskUserDto: CreateTaskUserDto,
  ): Promise<[User, CreateTaskUserDto]> {
    return this.userService.createTaskForUser(userId, createTaskUserDto);
  }
}
