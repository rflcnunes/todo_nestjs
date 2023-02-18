import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Task } from 'src/typeorm/entities/Task';
import { CreateTaskUserDto } from './dto/CreateTaskUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });
    return this.userRepository.save(createdUser);
  }

  async createTaskForUser(
    userId: number,
    createTaskUserDto: CreateTaskUserDto,
  ): Promise<[User, CreateTaskUserDto]> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const task = this.taskRepository.create({
      ...createTaskUserDto,
      createdAt: new Date(),
    });

    task.user = user;

    await this.taskRepository.save(task);

    return [user, task];
  }
}
