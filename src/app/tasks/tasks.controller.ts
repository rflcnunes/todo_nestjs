import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }
}
