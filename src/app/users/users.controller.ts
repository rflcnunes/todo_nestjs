import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { CreateTaskUserDto } from './dto/CreateTaskUser';
import { User } from 'src/entities/User';
import { JwtAuthGuard } from 'src/app/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/UpdateUser';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.showById(id);
  }

  @Post()
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

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
