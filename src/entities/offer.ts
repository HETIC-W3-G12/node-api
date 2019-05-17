import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm'

import User from './user'
import Project from './project'
import Refound from './refound'

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

  @ManyToOne(type => User, user => user.offers, {onDelete:'CASCADE'})
  user: User

  @ManyToOne(type => Project, project => project.offers, {onDelete:'CASCADE'})
  project: Project

  @Column({nullable: true})
  signature_investor_photo_key: string

  @OneToMany(type => Refound, refound => refound.offer, {onDelete:'CASCADE'})
  refounds: Refound[]
}
