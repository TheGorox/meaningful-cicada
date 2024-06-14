import { Column, Table, Model, DataType, Default } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column
    firstName: string

    @Column
    lastName: string

    @Column(DataType.SMALLINT)
    age: number

    @Column(DataType.ENUM('M', 'F'))
    sex: 'M'|'F'

    @Default(false)
    @Column(DataType.BOOLEAN)
    problems: boolean
}