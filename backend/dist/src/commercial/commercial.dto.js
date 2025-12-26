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
exports.TeamRanking = exports.UpdateCommercialInput = exports.CreateCommercialInput = exports.Commercial = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const immeuble_dto_1 = require("../immeuble/immeuble.dto");
const zone_dto_1 = require("../zone/zone.dto");
const statistic_dto_1 = require("../statistic/statistic.dto");
let Commercial = class Commercial {
    id;
    nom;
    prenom;
    email;
    numTel;
    age;
    managerId;
    directeurId;
    createdAt;
    updatedAt;
    immeubles;
    zones;
    statistics;
};
exports.Commercial = Commercial;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Commercial.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Commercial.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Commercial.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Commercial.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Commercial.prototype, "numTel", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Commercial.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Commercial.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Commercial.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Commercial.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Commercial.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [immeuble_dto_1.Immeuble]),
    __metadata("design:type", Array)
], Commercial.prototype, "immeubles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [zone_dto_1.Zone]),
    __metadata("design:type", Array)
], Commercial.prototype, "zones", void 0);
__decorate([
    (0, graphql_1.Field)(() => [statistic_dto_1.Statistic]),
    __metadata("design:type", Array)
], Commercial.prototype, "statistics", void 0);
exports.Commercial = Commercial = __decorate([
    (0, graphql_1.ObjectType)()
], Commercial);
let CreateCommercialInput = class CreateCommercialInput {
    nom;
    prenom;
    email;
    numTel;
    age;
    managerId;
    directeurId;
};
exports.CreateCommercialInput = CreateCommercialInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommercialInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommercialInput.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCommercialInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommercialInput.prototype, "numTel", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(16),
    (0, class_validator_1.Max)(70),
    __metadata("design:type", Number)
], CreateCommercialInput.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCommercialInput.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCommercialInput.prototype, "directeurId", void 0);
exports.CreateCommercialInput = CreateCommercialInput = __decorate([
    (0, graphql_1.InputType)()
], CreateCommercialInput);
let UpdateCommercialInput = class UpdateCommercialInput {
    id;
    nom;
    prenom;
    email;
    numTel;
    age;
    managerId;
    directeurId;
};
exports.UpdateCommercialInput = UpdateCommercialInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateCommercialInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCommercialInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCommercialInput.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCommercialInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCommercialInput.prototype, "numTel", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(16),
    (0, class_validator_1.Max)(70),
    __metadata("design:type", Number)
], UpdateCommercialInput.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateCommercialInput.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateCommercialInput.prototype, "directeurId", void 0);
exports.UpdateCommercialInput = UpdateCommercialInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateCommercialInput);
let TeamRanking = class TeamRanking {
    position;
    total;
    points;
    trend;
    managerNom;
    managerPrenom;
    managerEmail;
    managerNumTel;
};
exports.TeamRanking = TeamRanking;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TeamRanking.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TeamRanking.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TeamRanking.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TeamRanking.prototype, "trend", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TeamRanking.prototype, "managerNom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TeamRanking.prototype, "managerPrenom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TeamRanking.prototype, "managerEmail", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TeamRanking.prototype, "managerNumTel", void 0);
exports.TeamRanking = TeamRanking = __decorate([
    (0, graphql_1.ObjectType)()
], TeamRanking);
//# sourceMappingURL=commercial.dto.js.map