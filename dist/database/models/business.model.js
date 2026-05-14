"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const employee_model_1 = require("./employee.model");
const resale_certificate_model_1 = require("./resale-certificate.model");
const aml_questionnaire_model_1 = require("./aml-questionnaire.model");
let Business = class Business extends sequelize_typescript_1.Model {
};
exports.Business = Business;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Business.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "business_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "owner_first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "owner_last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "street_address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "postal_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Business.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    }),
    __metadata("design:type", String)
], Business.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => employee_model_1.Employee),
    __metadata("design:type", Array)
], Business.prototype, "employees", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => resale_certificate_model_1.ResaleCertificate),
    __metadata("design:type", resale_certificate_model_1.ResaleCertificate)
], Business.prototype, "resale_certificate", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => aml_questionnaire_model_1.AMLQuestionnaire),
    __metadata("design:type", aml_questionnaire_model_1.AMLQuestionnaire)
], Business.prototype, "aml_questionnaire", void 0);
exports.Business = Business = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "businesses",
        timestamps: true,
    })
], Business);
//# sourceMappingURL=business.model.js.map