import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './app/auth/auth.service';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { CreateUserDto } from './app/users/dto/CreateUser.dto';
import { HashHelper } from './helpers/hash.helper';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/register')
  async register(@Body() userDto: CreateUserDto) {
    const { username, password } = userDto;
    const hashedPassword = await HashHelper.hashWithBcrypt(password);
    return this.authService.register(username, hashedPassword);
  }

  @Post('auth/authorization')
  async authorization(@Request() req) {
    const { username, password } = req.body;

    return this.authService.login(username, password);
  }

  @Post('auth/login')
  async login(@Request() req) {
    const { username, password } = req.body;

    return this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
