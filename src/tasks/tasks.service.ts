import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/Task';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/CreateTaskDto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.taskRepository.create({
      ...createTaskDto,
      createdAt: new Date(),
    });
    return this.taskRepository.save(createdTask);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }
}
