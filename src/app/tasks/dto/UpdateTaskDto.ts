import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
export class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    minimum: 5,
    required: false,
    type: String,
  })
  @MinLength(5)
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    minimum: 5,
    required: false,
    type: String,
  })
  @MinLength(5)
  description: string;

  @ApiProperty({
    description: 'The completed status of the task',
    required: false,
    default: false,
    type: Boolean,
  })
  completed: boolean;
}
