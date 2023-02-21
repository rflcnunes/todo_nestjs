import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { RegExHelper } from '../../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    minimum: 3,
  })
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description:
      'The password of the user (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character)',
    minimum: 8,
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
  })
  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;
}
