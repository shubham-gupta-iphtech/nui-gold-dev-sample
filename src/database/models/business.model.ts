import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";

import { User } from "./user.model";
import { ResaleCertificate } from "./resale-certificate.model";
import { AMLQuestionnaire } from "./aml-questionnaire.model";

export interface BusinessAttributes {
  id: number;

  business_name: string;

  owner_first_name: string;

  owner_last_name: string;

  street_address: string;

  city: string;

  state: string;

  postal_code: string;

  country: string;

  email: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBusinessInput
  extends Omit<
    BusinessAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

@Table({
  tableName: "businesses",
  timestamps: true,
})
export class Business extends Model<
  BusinessAttributes,
  CreateBusinessInput
> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare business_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare owner_first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare owner_last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare street_address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare postal_code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

@HasMany(() => User, {
  foreignKey: "business_id",
  as: "employees",
})
declare employees: User[];

  @HasOne(() => ResaleCertificate)
  declare resale_certificate: ResaleCertificate;
  

  @HasOne(() => AMLQuestionnaire)
  declare aml_questionnaire: AMLQuestionnaire;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

}