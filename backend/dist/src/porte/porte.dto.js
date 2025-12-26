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
exports.UpdatePorteInput = exports.CreatePorteInput = exports.Porte = exports.StatutPorte = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var StatutPorte;
(function (StatutPorte) {
    StatutPorte["NON_VISITE"] = "NON_VISITE";
    StatutPorte["CONTRAT_SIGNE"] = "CONTRAT_SIGNE";
    StatutPorte["REFUS"] = "REFUS";
    StatutPorte["RENDEZ_VOUS_PRIS"] = "RENDEZ_VOUS_PRIS";
    StatutPorte["CURIEUX"] = "CURIEUX";
    StatutPorte["NECESSITE_REPASSAGE"] = "NECESSITE_REPASSAGE";
})(StatutPorte || (exports.StatutPorte = StatutPorte = {}));
(0, graphql_1.registerEnumType)(StatutPorte, {
    name: 'StatutPorte',
    description: 'Statut possible pour une porte',
});
let Porte = class Porte {
    id;
    numero;
    nomPersonnalise;
    etage;
    immeubleId;
    statut;
    nbRepassages;
    rdvDate;
    rdvTime;
    commentaire;
    derniereVisite;
    createdAt;
    updatedAt;
};
exports.Porte = Porte;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Porte.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Porte.prototype, "numero", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Porte.prototype, "nomPersonnalise", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Porte.prototype, "etage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Porte.prototype, "immeubleId", void 0);
__decorate([
    (0, graphql_1.Field)(() => StatutPorte),
    __metadata("design:type", String)
], Porte.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Porte.prototype, "nbRepassages", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Porte.prototype, "rdvDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Porte.prototype, "rdvTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Porte.prototype, "commentaire", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Porte.prototype, "derniereVisite", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Porte.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Porte.prototype, "updatedAt", void 0);
exports.Porte = Porte = __decorate([
    (0, graphql_1.ObjectType)()
], Porte);
let CreatePorteInput = class CreatePorteInput {
    numero;
    nomPersonnalise;
    etage;
    immeubleId;
    statut;
    nbRepassages;
    rdvDate;
    rdvTime;
    commentaire;
    derniereVisite;
};
exports.CreatePorteInput = CreatePorteInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePorteInput.prototype, "numero", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePorteInput.prototype, "nomPersonnalise", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePorteInput.prototype, "etage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePorteInput.prototype, "immeubleId", void 0);
__decorate([
    (0, graphql_1.Field)(() => StatutPorte, { defaultValue: StatutPorte.NON_VISITE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(StatutPorte),
    __metadata("design:type", String)
], CreatePorteInput.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePorteInput.prototype, "nbRepassages", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePorteInput.prototype, "rdvDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePorteInput.prototype, "rdvTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePorteInput.prototype, "commentaire", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePorteInput.prototype, "derniereVisite", void 0);
exports.CreatePorteInput = CreatePorteInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePorteInput);
let UpdatePorteInput = class UpdatePorteInput {
    id;
    numero;
    nomPersonnalise;
    etage;
    statut;
    nbRepassages;
    rdvDate;
    rdvTime;
    commentaire;
    derniereVisite;
};
exports.UpdatePorteInput = UpdatePorteInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdatePorteInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePorteInput.prototype, "numero", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePorteInput.prototype, "nomPersonnalise", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdatePorteInput.prototype, "etage", void 0);
__decorate([
    (0, graphql_1.Field)(() => StatutPorte, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(StatutPorte),
    __metadata("design:type", String)
], UpdatePorteInput.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdatePorteInput.prototype, "nbRepassages", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdatePorteInput.prototype, "rdvDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePorteInput.prototype, "rdvTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePorteInput.prototype, "commentaire", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdatePorteInput.prototype, "derniereVisite", void 0);
exports.UpdatePorteInput = UpdatePorteInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePorteInput);
//# sourceMappingURL=porte.dto.js.map