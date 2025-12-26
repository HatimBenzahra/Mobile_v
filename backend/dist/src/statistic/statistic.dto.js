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
exports.ZoneStatistic = exports.UpdateStatisticInput = exports.CreateStatisticInput = exports.Statistic = void 0;
const graphql_1 = require("@nestjs/graphql");
let Statistic = class Statistic {
    id;
    commercialId;
    managerId;
    directeurId;
    immeubleId;
    zoneId;
    contratsSignes;
    immeublesVisites;
    rendezVousPris;
    refus;
    nbImmeublesProspectes;
    nbPortesProspectes;
    createdAt;
    updatedAt;
};
exports.Statistic = Statistic;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "commercialId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "immeubleId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Statistic.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "contratsSignes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "immeublesVisites", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "rendezVousPris", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "refus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "nbImmeublesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Statistic.prototype, "nbPortesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Statistic.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Statistic.prototype, "updatedAt", void 0);
exports.Statistic = Statistic = __decorate([
    (0, graphql_1.ObjectType)()
], Statistic);
let CreateStatisticInput = class CreateStatisticInput {
    commercialId;
    managerId;
    directeurId;
    immeubleId;
    zoneId;
    contratsSignes;
    immeublesVisites;
    rendezVousPris;
    refus;
    nbImmeublesProspectes;
    nbPortesProspectes;
};
exports.CreateStatisticInput = CreateStatisticInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "commercialId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "immeubleId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "contratsSignes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "immeublesVisites", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "rendezVousPris", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "refus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "nbImmeublesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateStatisticInput.prototype, "nbPortesProspectes", void 0);
exports.CreateStatisticInput = CreateStatisticInput = __decorate([
    (0, graphql_1.InputType)()
], CreateStatisticInput);
let UpdateStatisticInput = class UpdateStatisticInput extends (0, graphql_1.PartialType)(CreateStatisticInput) {
    id;
};
exports.UpdateStatisticInput = UpdateStatisticInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateStatisticInput.prototype, "id", void 0);
exports.UpdateStatisticInput = UpdateStatisticInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateStatisticInput);
let ZoneStatistic = class ZoneStatistic {
    zoneId;
    zoneName;
    totalContratsSignes;
    totalImmeublesVisites;
    totalRendezVousPris;
    totalRefus;
    totalImmeublesProspectes;
    totalPortesProspectes;
    tauxConversion;
    tauxSuccesRdv;
    nombreCommerciaux;
    performanceGlobale;
};
exports.ZoneStatistic = ZoneStatistic;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ZoneStatistic.prototype, "zoneName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "totalContratsSignes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "totalImmeublesVisites", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "totalRendezVousPris", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "totalRefus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "totalImmeublesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "totalPortesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "tauxConversion", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "tauxSuccesRdv", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "nombreCommerciaux", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ZoneStatistic.prototype, "performanceGlobale", void 0);
exports.ZoneStatistic = ZoneStatistic = __decorate([
    (0, graphql_1.ObjectType)()
], ZoneStatistic);
//# sourceMappingURL=statistic.dto.js.map