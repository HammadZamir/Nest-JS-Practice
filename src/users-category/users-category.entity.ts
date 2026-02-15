
import { Users } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UsersCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Users, user => user.category)
  users: Users[];

  @Column({ default: true })
  isActive: boolean;

}
