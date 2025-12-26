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
exports.StatisticResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const statistic_service_1 = require("./statistic.service");
const statistic_sync_service_1 = require("./statistic-sync.service");
const statistic_dto_1 = require("./statistic.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let StatisticResolver = class StatisticResolver {
    statisticService;
    statisticSyncService;
    constructor(statisticService, statisticSyncService) {
        this.statisticService = statisticService;
        this.statisticSyncService = statisticSyncService;
    }
    createStatistic(createStatisticInput) {
        return this.statisticService.create(createStatisticInput);
    }
    findAll(commercialId, user) {
        return this.statisticService.findAll(commercialId, user.id, user.role);
    }
    findOne(id, user) {
        return this.statisticService.findOne(id, user.id, user.role);
    }
    updateStatistic(updateStatisticInput, user) {
        return this.statisticService.update(updateStatisticInput, user.id, user.role);
    }
    removeStatistic(id, user) {
        return this.statisticService.remove(id, user.id, user.role);
    }
    getZoneStatistics(user) {
        return this.statisticService.getZoneStatistics(user.id, user.role);
    }
    async recalculateAllStats() {
        const result = await this.statisticSyncService.recalculateAllStats();
        return `Recalcul terminé: ${result.updated} mis à jour, ${result.errors} erreurs`;
    }
    async validateStatsCoherence() {
        const result = await this.statisticSyncService.validateStatsCoherence();
        if (result.invalid.length === 0) {
            return `✅ Toutes les ${result.valid} statistiques sont cohérentes`;
        }
        else {
            return `⚠️ ${result.valid} cohérentes, ${result.invalid.length} incohérentes: ${JSON.stringify(result.invalid)}`;
        }
    }
    async syncCommercialStats(immeubleId, user) {
        await this.statisticService.ensureCanSyncCommercialStats(immeubleId, user.id, user.role);
        await this.statisticSyncService.syncCommercialStats(immeubleId);
        return `✅ Statistiques synchronisées pour l'immeuble ${immeubleId}`;
    }
    async syncManagerStats(managerId, user) {
        await this.statisticService.ensureCanSyncManagerStats(managerId, user.id, user.role);
        await this.statisticSyncService.syncManagerStats(managerId);
        return `✅ Statistiques synchronisées pour le manager ${managerId}`;
    }
};
exports.StatisticResolver = StatisticResolver;
__decorate([
    (0, graphql_1.Mutation)(() => statistic_dto_1.Statistic),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('createStatisticInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistic_dto_1.CreateStatisticInput]),
    __metadata("design:returntype", void 0)
], StatisticResolver.prototype, "createStatistic", null);
__decorate([
    (0, graphql_1.Query)(() => [statistic_dto_1.Statistic], { name: 'statistics' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('commercialId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StatisticResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => statistic_dto_1.Statistic, { name: 'statistic' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StatisticResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => statistic_dto_1.Statistic),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('updateStatisticInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistic_dto_1.UpdateStatisticInput, Object]),
    __metadata("design:returntype", void 0)
], StatisticResolver.prototype, "updateStatistic", null);
__decorate([
    (0, graphql_1.Mutation)(() => statistic_dto_1.Statistic),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StatisticResolver.prototype, "removeStatistic", null);
__decorate([
    (0, graphql_1.Query)(() => [statistic_dto_1.ZoneStatistic], { name: 'zoneStatistics' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatisticResolver.prototype, "getZoneStatistics", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'recalculateAllStats' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticResolver.prototype, "recalculateAllStats", null);
__decorate([
    (0, graphql_1.Query)(() => String, { name: 'validateStatsCoherence' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticResolver.prototype, "validateStatsCoherence", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'syncCommercialStats' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StatisticResolver.prototype, "syncCommercialStats", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'syncManagerStats' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('managerId', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StatisticResolver.prototype, "syncManagerStats", null);
exports.StatisticResolver = StatisticResolver = __decorate([
    (0, graphql_1.Resolver)(() => statistic_dto_1.Statistic),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [statistic_service_1.StatisticService,
        statistic_sync_service_1.StatisticSyncService])
], StatisticResolver);
//# sourceMappingURL=statistic.resolver.js.map