import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput extends Omit<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<UserAttributes, CreateUserInput> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
