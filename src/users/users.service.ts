import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });
    return this.userRepository.save(createdUser);
  }
}
