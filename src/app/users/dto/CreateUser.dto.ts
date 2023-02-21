import { IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;
}
