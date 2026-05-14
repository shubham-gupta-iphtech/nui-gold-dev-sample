import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { User } from "./user.model";

export interface PasswordSetTokenAttributes {

  id: number;

  user_id: number;

  token: string;

  expires_at: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePasswordSetTokenInput
  extends Omit<
    PasswordSetTokenAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
  > {}

@Table({
  tableName: "password_set_tokens",
  timestamps: true,
})
export class PasswordSetToken extends Model<
  PasswordSetTokenAttributes,
  CreatePasswordSetTokenInput
> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare token: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare expires_at: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}