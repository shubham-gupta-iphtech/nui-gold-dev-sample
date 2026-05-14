import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { Business } from "./business.model";

export interface UserAttributes {
  id: number;

  business_id: number;

  first_name: string;

  last_name: string;

  email: string;

  password: string | null;

  role:
    | "admin"
    | "trader"
    | "trading"
    | "view_only";

  is_email_verified: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput
  extends Omit<
    UserAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "is_email_verified"
  > {}

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<
  UserAttributes,
  CreateUserInput
> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare business_id: number;

  @BelongsTo(() => Business)
  declare business: Business;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

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
    allowNull: true,
  })
  declare password: string | null;

  @Column({
    type: DataType.ENUM(
      "admin",
      "trader",
      "trading",
      "view_only",
    ),
    allowNull: false,
    defaultValue: "trader",
  })
  declare role:
    | "admin"
    | "trader"
    | "trading"
    | "view_only";

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_email_verified: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}