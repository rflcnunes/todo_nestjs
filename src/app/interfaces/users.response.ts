import { User } from 'src/entities/User';

export interface UsersResponse {
  info: string;
  users: User[];
}
