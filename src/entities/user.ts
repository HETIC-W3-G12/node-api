import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string
}
