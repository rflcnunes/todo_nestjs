import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskUserDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
  createdAt?: Date;
}
