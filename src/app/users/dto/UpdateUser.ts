import { Matches } from 'class-validator';
import { RegExHelper } from '../../../helpers/regex.helper';

export class UpdateUserDto {
  username: string;

  @Matches(RegExHelper.password)
  password: string;
}
