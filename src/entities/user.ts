import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToMany} from 'typeorm'
import {IsEmail, Length} from 'class-validator'

import Project from './project'
import Offer from './offer'

@Entity()
@Unique(['email'])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  @IsEmail()
  email: string

  @Column({
    select: false,
    nullable: false
  })
  @Length(6, 72)
  password: string

  @Column({nullable: false})
  firstname: string

  @Column({nullable: false})
  lastname: string
  
  @Column({nullable: false})
  birthdate: Date

  @Column({nullable: false})
  birthplace: string

  @Column({nullable: false})
  adress: string

  @Column({nullable: false})
  city: string

  @Column({nullable: false})
  postCode: number

  @Column({nullable: true})
  identity_key: string

  @Column({nullable: true})
  face_photo_key: string

  @Column({default: false})
  admin: boolean

  @CreateDateColumn()
  createdDate: Date

  @OneToMany(type => Project, project => project.user)
  projects: Project[]

  @OneToMany(type => Offer, offer => offer.user)
  offers: Offer[]
}
