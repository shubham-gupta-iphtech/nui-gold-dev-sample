import { Sequelize } from "sequelize-typescript";
import { env } from "./env";
import { User } from "../database/models/user.model";
import { Business } from "../database/models/business.model";
import { ResaleCertificate } from "../database/models/resale-certificate.model";
import { AMLQuestionnaire } from "../database/models/aml-questionnaire.model";
import { PasswordSetToken } from "../database/models/password-set-token.model";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  logging: false,

  models: [User, Business, ResaleCertificate, AMLQuestionnaire, PasswordSetToken],

});
