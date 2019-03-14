import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm'

import User from './user'

export enum State {
  UNVALID = "unvalid", 
  VALID = "valid", 
  RUNNING = "running", 
  COMPLETE = "complete", 
  CANCELED = "canceled"
}

@Entity()
export default class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  title: string

  @Column({nullable: false})
  description: string

  @Column({nullable: false})
  price: number

  @Column({
    default: 0.01, 
    type: 'float'
  })
  interests: number

  @Column({
    type: "enum",
    enum: State,
    default: State.UNVALID
  })
  state: State

  @Column({nullable: false})
  timeLaps: number

  @CreateDateColumn()
  createdDate: Date

  @ManyToOne(type => User, user => user.projects)
  user: User
}
