import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateTaskUserDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy milk',
    minimum: 5,
    type: String,
  })
  @MinLength(5)
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Buy milk for the week',
    minimum: 5,
    required: false,
    type: String,
  })
  @MinLength(5)
  description?: string;
}
