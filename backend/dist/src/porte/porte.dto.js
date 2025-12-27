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
exports.StatusHistorique = exports.PorteInfo = exports.ManagerInfo = exports.CommercialInfo = exports.UpdatePorteInput = exports.CreatePorteInput = exports.PorteStatistics = exports.EtageInStatistics = exports.Porte = exports.StatutPorte = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const porte_status_constants_1 = require("./porte-status.constants");
var porte_status_constants_2 = require("./porte-status.constants");
Object.defineProperty(exports, "StatutPorte", { enumerable: true, get: function () { return porte_status_constants_2.StatutPorte; } });
(0, graphql_1.registerEnumType)(porte_status_constants_1.StatutPorte, {
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
    nbContrats;
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
    (0, graphql_1.Field)(() => porte_status_constants_1.StatutPorte),
    __metadata("design:type", String)
], Porte.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Porte.prototype, "nbRepassages", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Porte.prototype, "nbContrats", void 0);
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
let EtageInStatistics = class EtageInStatistics {
    etage;
    count;
};
exports.EtageInStatistics = EtageInStatistics;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EtageInStatistics.prototype, "etage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EtageInStatistics.prototype, "count", void 0);
exports.EtageInStatistics = EtageInStatistics = __decorate([
    (0, graphql_1.ObjectType)()
], EtageInStatistics);
let PorteStatistics = class PorteStatistics {
    totalPortes;
    contratsSigne;
    rdvPris;
    absent;
    argumente;
    refus;
    nonVisitees;
    necessiteRepassage;
    portesVisitees;
    tauxConversion;
    portesParEtage;
};
exports.PorteStatistics = PorteStatistics;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "totalPortes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "contratsSigne", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "rdvPris", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "absent", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "argumente", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "refus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "nonVisitees", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "necessiteRepassage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteStatistics.prototype, "portesVisitees", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PorteStatistics.prototype, "tauxConversion", void 0);
__decorate([
    (0, graphql_1.Field)(() => [EtageInStatistics]),
    __metadata("design:type", Array)
], PorteStatistics.prototype, "portesParEtage", void 0);
exports.PorteStatistics = PorteStatistics = __decorate([
    (0, graphql_1.ObjectType)()
], PorteStatistics);
let CreatePorteInput = class CreatePorteInput {
    numero;
    nomPersonnalise;
    etage;
    immeubleId;
    statut;
    nbRepassages;
    nbContrats;
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
    (0, graphql_1.Field)(() => porte_status_constants_1.StatutPorte, { defaultValue: porte_status_constants_1.StatutPorte.NON_VISITE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(porte_status_constants_1.StatutPorte),
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
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePorteInput.prototype, "nbContrats", void 0);
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
    nbContrats;
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
    (0, graphql_1.Field)(() => porte_status_constants_1.StatutPorte, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(porte_status_constants_1.StatutPorte),
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
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdatePorteInput.prototype, "nbContrats", void 0);
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
let CommercialInfo = class CommercialInfo {
    id;
    nom;
    prenom;
};
exports.CommercialInfo = CommercialInfo;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CommercialInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommercialInfo.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommercialInfo.prototype, "prenom", void 0);
exports.CommercialInfo = CommercialInfo = __decorate([
    (0, graphql_1.ObjectType)()
], CommercialInfo);
let ManagerInfo = class ManagerInfo {
    id;
    nom;
    prenom;
};
exports.ManagerInfo = ManagerInfo;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ManagerInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ManagerInfo.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ManagerInfo.prototype, "prenom", void 0);
exports.ManagerInfo = ManagerInfo = __decorate([
    (0, graphql_1.ObjectType)()
], ManagerInfo);
let PorteInfo = class PorteInfo {
    id;
    numero;
    etage;
};
exports.PorteInfo = PorteInfo;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PorteInfo.prototype, "numero", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PorteInfo.prototype, "etage", void 0);
exports.PorteInfo = PorteInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PorteInfo);
let StatusHistorique = class StatusHistorique {
    id;
    porteId;
    commercialId;
    managerId;
    statut;
    commentaire;
    rdvDate;
    rdvTime;
    createdAt;
    porte;
    commercial;
    manager;
};
exports.StatusHistorique = StatusHistorique;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusHistorique.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusHistorique.prototype, "porteId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], StatusHistorique.prototype, "commercialId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], StatusHistorique.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => porte_status_constants_1.StatutPorte),
    __metadata("design:type", String)
], StatusHistorique.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], StatusHistorique.prototype, "commentaire", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], StatusHistorique.prototype, "rdvDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], StatusHistorique.prototype, "rdvTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], StatusHistorique.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => PorteInfo, { nullable: true }),
    __metadata("design:type", PorteInfo)
], StatusHistorique.prototype, "porte", void 0);
__decorate([
    (0, graphql_1.Field)(() => CommercialInfo, { nullable: true }),
    __metadata("design:type", CommercialInfo)
], StatusHistorique.prototype, "commercial", void 0);
__decorate([
    (0, graphql_1.Field)(() => ManagerInfo, { nullable: true }),
    __metadata("design:type", ManagerInfo)
], StatusHistorique.prototype, "manager", void 0);
exports.StatusHistorique = StatusHistorique = __decorate([
    (0, graphql_1.ObjectType)()
], StatusHistorique);
//# sourceMappingURL=porte.dto.js.map