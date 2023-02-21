import { Matches, MinLength } from 'class-validator';
import { RegExHelper } from '../../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    minimum: 3,
    required: true,
  })
  @MinLength(3)
  username: string;

  @ApiProperty({
    description:
      'The password of the user (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character)',
    minimum: 8,
    required: true,
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
  })
  @Matches(RegExHelper.password)
  password: string;
}
