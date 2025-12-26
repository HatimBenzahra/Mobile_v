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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const zone_service_1 = require("./zone.service");
const zone_dto_1 = require("./zone.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let ZoneResolver = class ZoneResolver {
    zoneService;
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    createZone(createZoneInput) {
        return this.zoneService.create(createZoneInput);
    }
    findAll(user) {
        return this.zoneService.findAll(user.id, user.role);
    }
    findOne(id, user) {
        return this.zoneService.findOne(id, user.id, user.role);
    }
    updateZone(updateZoneInput) {
        return this.zoneService.update(updateZoneInput);
    }
    removeZone(id) {
        return this.zoneService.remove(id);
    }
    assignZoneToCommercial(zoneId, commercialId, user) {
        return this.zoneService
            .assignToCommercial(zoneId, commercialId, user.id, user.role)
            .then(() => true);
    }
    assignZoneToDirecteur(zoneId, directeurId, user) {
        return this.zoneService
            .assignToDirecteur(zoneId, directeurId, user.id, user.role)
            .then(() => true);
    }
    assignZoneToManager(zoneId, managerId, user) {
        return this.zoneService.assignToManager(zoneId, managerId, user.id, user.role).then(() => true);
    }
    unassignZoneFromCommercial(zoneId, commercialId, user) {
        return this.zoneService
            .unassignFromCommercial(zoneId, commercialId, user.id, user.role)
            .then(() => true);
    }
    assignZoneToUser(input, user) {
        return this.zoneService.assignZoneToUser(input.zoneId, input.userId, input.userType, user.id, user.role);
    }
    unassignUser(userId, userType, user) {
        return this.zoneService.unassignUser(userId, userType, user.id, user.role).then(() => true);
    }
    getCurrentAssignment(userId, userType, user) {
        return this.zoneService.getCurrentAssignment(userId, userType, user.id, user.role);
    }
    getUserZoneHistory(userId, userType, user) {
        return this.zoneService.getUserZoneHistory(userId, userType, user.id, user.role);
    }
    getZoneHistory(zoneId) {
        return this.zoneService.getZoneHistory(zoneId);
    }
    getZoneCurrentAssignments(zoneId, user) {
        return this.zoneService.getZoneCurrentAssignments(zoneId, user.id, user.role);
    }
    getAllZoneHistory(user) {
        return this.zoneService.getAllZoneHistory(user.id, user.role);
    }
    getAllCurrentAssignments(user) {
        return this.zoneService.getAllCurrentAssignments(user.id, user.role);
    }
};
exports.ZoneResolver = ZoneResolver;
__decorate([
    (0, graphql_1.Mutation)(() => zone_dto_1.Zone),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('createZoneInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [zone_dto_1.CreateZoneInput]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "createZone", null);
__decorate([
    (0, graphql_1.Query)(() => [zone_dto_1.Zone], { name: 'zones' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => zone_dto_1.Zone, { name: 'zone' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => zone_dto_1.Zone),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('updateZoneInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [zone_dto_1.UpdateZoneInput]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "updateZone", null);
__decorate([
    (0, graphql_1.Mutation)(() => zone_dto_1.Zone),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "removeZone", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('zoneId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('commercialId', { type: () => graphql_1.Int })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "assignZoneToCommercial", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('zoneId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('directeurId', { type: () => graphql_1.Int })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "assignZoneToDirecteur", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('zoneId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('managerId', { type: () => graphql_1.Int })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "assignZoneToManager", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('zoneId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('commercialId', { type: () => graphql_1.Int })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "unassignZoneFromCommercial", null);
__decorate([
    (0, graphql_1.Mutation)(() => zone_dto_1.ZoneEnCours, { name: 'assignZoneToUser' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [zone_dto_1.AssignZoneInput, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "assignZoneToUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'unassignUser' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userType', { type: () => zone_dto_1.UserType })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "unassignUser", null);
__decorate([
    (0, graphql_1.Query)(() => zone_dto_1.ZoneEnCours, { name: 'currentUserAssignment', nullable: true }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userType', { type: () => zone_dto_1.UserType })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "getCurrentAssignment", null);
__decorate([
    (0, graphql_1.Query)(() => [zone_dto_1.HistoriqueZone], { name: 'userZoneHistory' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userType', { type: () => zone_dto_1.UserType })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "getUserZoneHistory", null);
__decorate([
    (0, graphql_1.Query)(() => [zone_dto_1.HistoriqueZone], { name: 'zoneHistory' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('zoneId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "getZoneHistory", null);
__decorate([
    (0, graphql_1.Query)(() => [zone_dto_1.ZoneEnCours], { name: 'zoneCurrentAssignments' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('zoneId', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "getZoneCurrentAssignments", null);
__decorate([
    (0, graphql_1.Query)(() => [zone_dto_1.HistoriqueZone], { name: 'allZoneHistory' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "getAllZoneHistory", null);
__decorate([
    (0, graphql_1.Query)(() => [zone_dto_1.ZoneEnCours], { name: 'allCurrentAssignments' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZoneResolver.prototype, "getAllCurrentAssignments", null);
exports.ZoneResolver = ZoneResolver = __decorate([
    (0, graphql_1.Resolver)(() => zone_dto_1.Zone),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [zone_service_1.ZoneService])
], ZoneResolver);
//# sourceMappingURL=zone.resolver.js.map