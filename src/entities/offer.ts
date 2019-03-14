import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm'

import User from './user'
import Project from './project'

export enum State {
    WAITING = "waiting", 
    ACCEPTED = "accepted", 
    REFUSED = "refused", 
    CANCELED = "canceled"
  }

@Entity()
export default class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: "enum",
    enum: State,
    default: State.WAITING
  })
  state: State

  @CreateDateColumn()
  createdDate: Date

  @Column({default: false})
  signed_by_owner: boolean

  @Column({default: false})
  signed_by_investor: boolean

  @ManyToOne(type => User, user => user.offers)
  user: User

  @ManyToOne(type => Project, project => project.offers)
  project: Project
}