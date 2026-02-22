
import { UsersCategory } from 'src/users-category/users-category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({select: false})
  password: string;

  @ManyToOne(() => UsersCategory, category => category.users)
  category: UsersCategory;

  @Column({ default: true })
  isActive: boolean;

}
