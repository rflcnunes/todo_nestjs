import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  NotFoundException,
  UseGuards,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DefaultResponse } from '../../interfaces/default.response';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@ApiTags('Tasks')
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
  @HttpCode(200)
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<DefaultResponse> {
    try {
      return {
        info: `Task with ID ${id} updated`,
        data: await this.taskService.updateTask(id, updateTaskDto),
      };
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async deleteTask(@Param('id') id: number): Promise<DefaultResponse> {
    try {
      await this.taskService.deleteTask(id);
      return { info: `Task with ID ${id} deleted` };
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
