import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { Business } from "./business.model";

export interface AMLQuestionnaireAttributes {
  id: number;

  business_id: number;

  aml_policy: boolean;

  independent_audit: boolean;

  aml_training_program: boolean;

  auditor_name: string;

  auditor_contact: string;

  auditor_details: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAMLQuestionnaireInput
  extends Omit<
    AMLQuestionnaireAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

@Table({
  tableName: "aml_questionnaires",
  timestamps: true,
})
export class AMLQuestionnaire extends Model<
  AMLQuestionnaireAttributes,
  CreateAMLQuestionnaireInput
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
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare aml_policy: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare independent_audit: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare aml_training_program: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare auditor_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare auditor_contact: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare auditor_details: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}