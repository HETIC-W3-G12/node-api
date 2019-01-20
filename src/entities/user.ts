import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm'
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
  @Length(6, 20)
  password: string
}
