import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/typeorm/entities/User';
import { TasksModule } from 'src/tasks/tasks.module';
import { Task } from 'src/typeorm/entities/Task';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TasksModule,
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
