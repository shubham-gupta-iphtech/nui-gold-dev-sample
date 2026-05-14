import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { Business } from "./business.model";

export interface ResaleCertificateAttributes {
  id: number;

  business_id: number;

  certificate_number: string;

  signature: string;

  print_name: string;

  title: string;

  signed_date: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateResaleCertificateInput
  extends Omit<
    ResaleCertificateAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

@Table({
  tableName: "resale_certificates",
  timestamps: true,
})
export class ResaleCertificate extends Model<
  ResaleCertificateAttributes,
  CreateResaleCertificateInput
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
  declare certificate_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare signature: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare print_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare signed_date: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}