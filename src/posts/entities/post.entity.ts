import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne(() => User, (user) => user.posts, { nullable: false, onDelete: 'CASCADE' })
  user: User

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
