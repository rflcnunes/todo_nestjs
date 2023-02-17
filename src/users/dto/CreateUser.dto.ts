export class CreateUserDto {
  username: string;
  password: string;
  createdAt?: Date;
  authStrategy?: string;
}
