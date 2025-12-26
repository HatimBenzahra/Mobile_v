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
exports.UpdateManagerInput = exports.CreateManagerInput = exports.Manager = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const directeur_dto_1 = require("../directeur/directeur.dto");
const commercial_dto_1 = require("../commercial/commercial.dto");
const zone_dto_1 = require("../zone/zone.dto");
const immeuble_dto_1 = require("../immeuble/immeuble.dto");
const statistic_dto_1 = require("../statistic/statistic.dto");
let Manager = class Manager {
    id;
    nom;
    prenom;
    email;
    numTelephone;
    directeurId;
    createdAt;
    updatedAt;
    directeur;
    commercials;
    zones;
    immeubles;
    statistics;
    personalStatistics;
    teamStatistics;
};
exports.Manager = Manager;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Manager.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Manager.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Manager.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Manager.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Manager.prototype, "numTelephone", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Manager.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Manager.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Manager.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => directeur_dto_1.Directeur, { nullable: true }),
    __metadata("design:type", Object)
], Manager.prototype, "directeur", void 0);
__decorate([
    (0, graphql_1.Field)(() => [commercial_dto_1.Commercial], { nullable: true }),
    __metadata("design:type", Array)
], Manager.prototype, "commercials", void 0);
__decorate([
    (0, graphql_1.Field)(() => [zone_dto_1.Zone], { nullable: true }),
    __metadata("design:type", Array)
], Manager.prototype, "zones", void 0);
__decorate([
    (0, graphql_1.Field)(() => [immeuble_dto_1.Immeuble], { nullable: true }),
    __metadata("design:type", Array)
], Manager.prototype, "immeubles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [statistic_dto_1.Statistic], { nullable: true }),
    __metadata("design:type", Array)
], Manager.prototype, "statistics", void 0);
__decorate([
    (0, graphql_1.Field)(() => [statistic_dto_1.Statistic], { nullable: true }),
    __metadata("design:type", Array)
], Manager.prototype, "personalStatistics", void 0);
__decorate([
    (0, graphql_1.Field)(() => [statistic_dto_1.Statistic], { nullable: true }),
    __metadata("design:type", Array)
], Manager.prototype, "teamStatistics", void 0);
exports.Manager = Manager = __decorate([
    (0, graphql_1.ObjectType)()
], Manager);
let CreateManagerInput = class CreateManagerInput {
    nom;
    prenom;
    email;
    numTelephone;
    directeurId;
};
exports.CreateManagerInput = CreateManagerInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateManagerInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateManagerInput.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateManagerInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateManagerInput.prototype, "numTelephone", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateManagerInput.prototype, "directeurId", void 0);
exports.CreateManagerInput = CreateManagerInput = __decorate([
    (0, graphql_1.InputType)()
], CreateManagerInput);
let UpdateManagerInput = class UpdateManagerInput {
    id;
    nom;
    prenom;
    email;
    numTelephone;
    directeurId;
};
exports.UpdateManagerInput = UpdateManagerInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateManagerInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateManagerInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateManagerInput.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateManagerInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('TN'),
    __metadata("design:type", String)
], UpdateManagerInput.prototype, "numTelephone", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateManagerInput.prototype, "directeurId", void 0);
exports.UpdateManagerInput = UpdateManagerInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateManagerInput);
//# sourceMappingURL=manager.dto.js.map