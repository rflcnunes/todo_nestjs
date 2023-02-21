import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateTaskUserDto {
  @ApiProperty({
    description: 'The title of the task',
    minimum: 5,
  })
  @MinLength(5)
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    minimum: 5,
    required: false,
  })
  @MinLength(5)
  description?: string;
}
