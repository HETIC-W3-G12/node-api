import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm'

import Offer from './offer'

export enum State {
  WAITING = "waiting", 
  PAYED = "payed", 
  LATE = "late", 
}

@Entity()
export default class Refound extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ 
    type: 'float'
  })
  amount: number

  @Column({
    type: "enum",
    enum: State,
    default: State.WAITING
  })
  state: State

  @CreateDateColumn()
  createdDate: Date

  @ManyToOne(type => Offer, offer => offer.refounds)
  offer: Offer

  @CreateDateColumn()
  dueDate: Date
}