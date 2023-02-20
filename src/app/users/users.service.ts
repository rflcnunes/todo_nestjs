import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Task } from 'src/entities/Task';
import { CreateTaskUserDto } from './dto/CreateTaskUser';
import { HashHelper } from 'src/helpers/hash.helper';
import { UpdateUserDto } from './dto/UpdateUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto.password);
    const hashedPassword = await HashHelper.hashWithBcrypt(
      createUserDto.password,
    );

    const createdUser = await this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log(createdUser);

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

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    if (updateUserDto.username !== undefined) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.password !== undefined) {
      user.password = await HashHelper.hashWithBcrypt(updateUserDto.password);
    }

    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
