import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 300 })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
