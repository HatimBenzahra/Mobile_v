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
exports.UpdateDirecteurInput = exports.CreateDirecteurInput = exports.Directeur = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const statistic_dto_1 = require("../statistic/statistic.dto");
let Directeur = class Directeur {
    id;
    nom;
    prenom;
    adresse;
    email;
    numTelephone;
    createdAt;
    updatedAt;
    statistics;
};
exports.Directeur = Directeur;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Directeur.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Directeur.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Directeur.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Directeur.prototype, "adresse", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Directeur.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Directeur.prototype, "numTelephone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Directeur.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Directeur.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [statistic_dto_1.Statistic], { nullable: true }),
    __metadata("design:type", Array)
], Directeur.prototype, "statistics", void 0);
exports.Directeur = Directeur = __decorate([
    (0, graphql_1.ObjectType)()
], Directeur);
let CreateDirecteurInput = class CreateDirecteurInput {
    nom;
    prenom;
    adresse;
    email;
    numTelephone;
};
exports.CreateDirecteurInput = CreateDirecteurInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDirecteurInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDirecteurInput.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDirecteurInput.prototype, "adresse", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateDirecteurInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDirecteurInput.prototype, "numTelephone", void 0);
exports.CreateDirecteurInput = CreateDirecteurInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDirecteurInput);
let UpdateDirecteurInput = class UpdateDirecteurInput {
    id;
    nom;
    prenom;
    adresse;
    email;
    numTelephone;
};
exports.UpdateDirecteurInput = UpdateDirecteurInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateDirecteurInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDirecteurInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDirecteurInput.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDirecteurInput.prototype, "adresse", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateDirecteurInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDirecteurInput.prototype, "numTelephone", void 0);
exports.UpdateDirecteurInput = UpdateDirecteurInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateDirecteurInput);
//# sourceMappingURL=directeur.dto.js.map