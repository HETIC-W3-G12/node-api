import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn} from 'typeorm'
import {IsEmail, Length} from 'class-validator'

@Entity()
@Unique(['email'])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  @Length(6, 72)
  password: string

  @Column({
    default: false
  })
  admin: boolean

  @CreateDateColumn()
  createdDate: Date
}
