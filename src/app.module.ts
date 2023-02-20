import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { UsersModule } from './app/users/users.module';
import { TasksModule } from './app/tasks/tasks.module';
import { Task } from './entities/Task';
import { HealthModule } from './app/health/health.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || process.env.DB_PASSWORD_ROOT,
      database: process.env.DB_DATABASE,
      entities: [User, Task],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
    TasksModule,
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
