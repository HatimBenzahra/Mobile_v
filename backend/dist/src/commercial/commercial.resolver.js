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
exports.CommercialResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const commercial_service_1 = require("./commercial.service");
const commercial_dto_1 = require("./commercial.dto");
const zone_dto_1 = require("../zone/zone.dto");
const immeuble_dto_1 = require("../immeuble/immeuble.dto");
const statistic_dto_1 = require("../statistic/statistic.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let CommercialResolver = class CommercialResolver {
    commercialService;
    constructor(commercialService) {
        this.commercialService = commercialService;
    }
    createCommercial(createCommercialInput) {
        return this.commercialService.create(createCommercialInput);
    }
    findAll(user) {
        return this.commercialService.findAll(user.id, user.role);
    }
    findOne(id, user) {
        return this.commercialService.findOne(id, user.id, user.role);
    }
    updateCommercial(updateCommercialInput, user) {
        return this.commercialService.update(updateCommercialInput, user.id, user.role);
    }
    removeCommercial(id, user) {
        return this.commercialService.remove(id, user.id, user.role);
    }
    async zones(commercial) {
        const zoneEnCours = await this.commercialService.getCurrentZone(commercial.id);
        return zoneEnCours ? [zoneEnCours] : [];
    }
    immeubles(commercial) {
        return commercial.immeubles || [];
    }
    statistics(commercial) {
        return commercial.statistics || [];
    }
    async getTeamRanking(commercialId, user) {
        return this.commercialService.getTeamRanking(commercialId, user.id, user.role);
    }
};
exports.CommercialResolver = CommercialResolver;
__decorate([
    (0, graphql_1.Mutation)(() => commercial_dto_1.Commercial),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('createCommercialInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commercial_dto_1.CreateCommercialInput]),
    __metadata("design:returntype", void 0)
], CommercialResolver.prototype, "createCommercial", null);
__decorate([
    (0, graphql_1.Query)(() => [commercial_dto_1.Commercial], { name: 'commercials' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommercialResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => commercial_dto_1.Commercial, { name: 'commercial' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CommercialResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => commercial_dto_1.Commercial),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('updateCommercialInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commercial_dto_1.UpdateCommercialInput, Object]),
    __metadata("design:returntype", void 0)
], CommercialResolver.prototype, "updateCommercial", null);
__decorate([
    (0, graphql_1.Mutation)(() => commercial_dto_1.Commercial),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CommercialResolver.prototype, "removeCommercial", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [zone_dto_1.Zone]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommercialResolver.prototype, "zones", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [immeuble_dto_1.Immeuble]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], CommercialResolver.prototype, "immeubles", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [statistic_dto_1.Statistic]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], CommercialResolver.prototype, "statistics", null);
__decorate([
    (0, graphql_1.Query)(() => commercial_dto_1.TeamRanking, { name: 'commercialTeamRanking' }),
    (0, roles_decorator_1.Roles)('commercial'),
    __param(0, (0, graphql_1.Args)('commercialId', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommercialResolver.prototype, "getTeamRanking", null);
exports.CommercialResolver = CommercialResolver = __decorate([
    (0, graphql_1.Resolver)(() => commercial_dto_1.Commercial),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [commercial_service_1.CommercialService])
], CommercialResolver);
//# sourceMappingURL=commercial.resolver.js.map