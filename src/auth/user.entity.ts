import { Task } from 'src/tasks/tasks.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) // eager=false when we fetch user, we will also fetch the tasks with it
  tasks: Task[]
}
