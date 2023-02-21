import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { CreateTaskUserDto } from './dto/CreateTaskUser';
import { User } from 'src/entities/User';
import { JwtAuthGuard } from 'src/app/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/UpdateUser';
import { UsersResponse } from '../../interfaces/users.response';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'List of all users',
  })
  @ApiBearerAuth()
  async getAllUsers(): Promise<UsersResponse> {
    try {
      const users = await this.userService.getAllUsers();
      return { info: 'All users', users };
    } catch (error) {
      throw new NotFoundException('Users not found');
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return this.userService.showById(id);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.userService.createUser(createUserDto);

      const { username } = response;

      return `User ${username} created`;
    } catch (error) {
      throw new NotFoundException(
        `User with id ${createUserDto.username} not found`,
      );
    }
  }

  @Post(':userId/tasks')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async createTaskForUser(
    @Param('userId') userId: number,
    @Body() createTaskUserDto: CreateTaskUserDto,
  ): Promise<[User, CreateTaskUserDto]> {
    try {
      return this.userService.createTaskForUser(userId, createTaskUserDto);
    } catch (error) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return this.userService.updateUser(userId, updateUserDto);
    } catch (error) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
