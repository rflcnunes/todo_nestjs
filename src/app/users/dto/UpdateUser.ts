import { Matches } from 'class-validator';
import { RegExHelper } from '../../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @Matches(RegExHelper.password)
  password: string;
}
