import { Table, Column, Model, AutoIncrement, PrimaryKey, Unique } from 'sequelize-typescript'

@Table
export class User extends Model {
   @AutoIncrement
   @PrimaryKey
   @Column
   id: number
   @Column
   firstname: string
   @Column
   lastname: string
   @Unique
   @Column
   email: string
   @Column
   password: string
   @Column({ defaultValue: true })
   active: boolean
}
