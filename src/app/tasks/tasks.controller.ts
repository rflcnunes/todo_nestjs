import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  NotFoundException,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { Task } from 'src/entities/Task';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DefaultResponse } from '../interfaces/default.response';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<DefaultResponse> {
    try {
      return { info: 'All tasks', data: await this.taskService.findAll() };
    } catch (error) {
      throw new NotFoundException('Tasks not found');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      return this.taskService.updateTask(id, updateTaskDto);
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
