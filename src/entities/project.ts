import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm'

import User from './user'

export enum State {
  unvalid, valid, running, complete, canceled
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

  @Column({nullable: false})
  interests: number

  @Column({nullable: false})
  state: State

  @Column({nullable: false})
  timeLaps: number

  @CreateDateColumn()
  createdDate: Date

  @ManyToOne(type => User, user => user.projects)
  user: User
}
