import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { Task } from 'src/entities/Task';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      return this.taskService.findAll();
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
