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
exports.AssignZoneInput = exports.HistoriqueZone = exports.ZoneEnCours = exports.UpdateZoneInput = exports.CreateZoneInput = exports.Zone = exports.UserType = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const immeuble_dto_1 = require("../immeuble/immeuble.dto");
var UserType;
(function (UserType) {
    UserType["COMMERCIAL"] = "COMMERCIAL";
    UserType["MANAGER"] = "MANAGER";
    UserType["DIRECTEUR"] = "DIRECTEUR";
})(UserType || (exports.UserType = UserType = {}));
(0, graphql_1.registerEnumType)(UserType, {
    name: 'UserType',
    description: 'Type d\'utilisateur pouvant être assigné à une zone',
});
let Zone = class Zone {
    id;
    nom;
    xOrigin;
    yOrigin;
    rayon;
    directeurId;
    managerId;
    immeubles;
    createdAt;
    updatedAt;
};
exports.Zone = Zone;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Zone.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Zone.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Zone.prototype, "xOrigin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Zone.prototype, "yOrigin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Zone.prototype, "rayon", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], Zone.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], Zone.prototype, "managerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [immeuble_dto_1.Immeuble], { nullable: true }),
    __metadata("design:type", Array)
], Zone.prototype, "immeubles", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Zone.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Zone.prototype, "updatedAt", void 0);
exports.Zone = Zone = __decorate([
    (0, graphql_1.ObjectType)()
], Zone);
let CreateZoneInput = class CreateZoneInput {
    nom;
    xOrigin;
    yOrigin;
    rayon;
    directeurId;
    managerId;
};
exports.CreateZoneInput = CreateZoneInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateZoneInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateZoneInput.prototype, "xOrigin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateZoneInput.prototype, "yOrigin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateZoneInput.prototype, "rayon", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateZoneInput.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateZoneInput.prototype, "managerId", void 0);
exports.CreateZoneInput = CreateZoneInput = __decorate([
    (0, graphql_1.InputType)()
], CreateZoneInput);
let UpdateZoneInput = class UpdateZoneInput {
    id;
    nom;
    xOrigin;
    yOrigin;
    rayon;
    directeurId;
    managerId;
};
exports.UpdateZoneInput = UpdateZoneInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateZoneInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateZoneInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateZoneInput.prototype, "xOrigin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateZoneInput.prototype, "yOrigin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateZoneInput.prototype, "rayon", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateZoneInput.prototype, "directeurId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateZoneInput.prototype, "managerId", void 0);
exports.UpdateZoneInput = UpdateZoneInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateZoneInput);
let ZoneEnCours = class ZoneEnCours {
    id;
    zoneId;
    userId;
    userType;
    assignedAt;
    zone;
};
exports.ZoneEnCours = ZoneEnCours;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneEnCours.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneEnCours.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ZoneEnCours.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserType),
    __metadata("design:type", String)
], ZoneEnCours.prototype, "userType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ZoneEnCours.prototype, "assignedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Zone, { nullable: true }),
    __metadata("design:type", Zone)
], ZoneEnCours.prototype, "zone", void 0);
exports.ZoneEnCours = ZoneEnCours = __decorate([
    (0, graphql_1.ObjectType)()
], ZoneEnCours);
let HistoriqueZone = class HistoriqueZone {
    id;
    zoneId;
    userId;
    userType;
    assignedAt;
    unassignedAt;
    totalContratsSignes;
    totalImmeublesVisites;
    totalRendezVousPris;
    totalRefus;
    totalImmeublesProspectes;
    totalPortesProspectes;
    zone;
};
exports.HistoriqueZone = HistoriqueZone;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserType),
    __metadata("design:type", String)
], HistoriqueZone.prototype, "userType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], HistoriqueZone.prototype, "assignedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], HistoriqueZone.prototype, "unassignedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "totalContratsSignes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "totalImmeublesVisites", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "totalRendezVousPris", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "totalRefus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "totalImmeublesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HistoriqueZone.prototype, "totalPortesProspectes", void 0);
__decorate([
    (0, graphql_1.Field)(() => Zone, { nullable: true }),
    __metadata("design:type", Zone)
], HistoriqueZone.prototype, "zone", void 0);
exports.HistoriqueZone = HistoriqueZone = __decorate([
    (0, graphql_1.ObjectType)()
], HistoriqueZone);
let AssignZoneInput = class AssignZoneInput {
    zoneId;
    userId;
    userType;
};
exports.AssignZoneInput = AssignZoneInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AssignZoneInput.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AssignZoneInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserType),
    (0, class_validator_1.IsEnum)(UserType),
    __metadata("design:type", String)
], AssignZoneInput.prototype, "userType", void 0);
exports.AssignZoneInput = AssignZoneInput = __decorate([
    (0, graphql_1.InputType)()
], AssignZoneInput);
//# sourceMappingURL=zone.dto.js.map