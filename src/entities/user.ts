import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToMany} from 'typeorm'
import {IsEmail, Length} from 'class-validator'

import Project from './project'
import Offer from './offer'

@Entity()
@Unique(['email'])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsEmail()
  email: string

  @Column({ select: false })
  @Length(6, 72)
  password: string

  @Column({
    default: false
  })
  admin: boolean

  @CreateDateColumn()
  createdDate: Date

  @OneToMany(type => Project, project => project.user)
  projects: Project[]

  @OneToMany(type => Offer, offer => offer.user)
  offers: Offer[]
}
