import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid') id!: number

  @Column() first_name!: string

  @Column() last_name!: string

  @Column() email!: string

  @Column() gender!: string

  @Column() age!: number
}
