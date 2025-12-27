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
exports.PorteResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const porte_service_1 = require("./porte.service");
const porte_dto_1 = require("./porte.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let PorteResolver = class PorteResolver {
    porteService;
    constructor(porteService) {
        this.porteService = porteService;
    }
    createPorte(createPorteInput) {
        return this.porteService.create(createPorteInput);
    }
    findAll() {
        return this.porteService.findAll();
    }
    findOne(id, user) {
        return this.porteService.findOne(id, user.id, user.role);
    }
    findByImmeuble(immeubleId, skip, take, etage, user) {
        return this.porteService.findByImmeuble(immeubleId, user.id, user.role, skip, take, etage);
    }
    getStatistics(immeubleId) {
        return this.porteService.getStatistiquesPortes(immeubleId);
    }
    updatePorte(updatePorteInput, user) {
        return this.porteService.update(updatePorteInput, user.id, user.role);
    }
    removePorte(id, user) {
        return this.porteService.remove(id, user.id, user.role);
    }
    async createPortesForImmeuble(immeubleId, nbEtages, nbPortesParEtage, user) {
        await this.porteService.createPortesForImmeuble(immeubleId, nbEtages, nbPortesParEtage, user.id, user.role);
        return true;
    }
    findModifiedToday(immeubleId, user) {
        return this.porteService.findModifiedToday(immeubleId, user?.id, user?.role);
    }
    findRdvToday(user) {
        return this.porteService.findRdvToday(user.id, user.role);
    }
    getStatusHistoriqueByPorte(porteId) {
        return this.porteService.getStatusHistoriqueByPorte(porteId);
    }
    getStatusHistoriqueByImmeuble(immeubleId) {
        return this.porteService.getStatusHistoriqueByImmeuble(immeubleId);
    }
};
exports.PorteResolver = PorteResolver;
__decorate([
    (0, graphql_1.Mutation)(() => porte_dto_1.Porte),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('createPorteInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [porte_dto_1.CreatePorteInput]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "createPorte", null);
__decorate([
    (0, graphql_1.Query)(() => [porte_dto_1.Porte], { name: 'portes' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => porte_dto_1.Porte, { name: 'porte' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [porte_dto_1.Porte], { name: 'portesByImmeuble' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, nullable: true })),
    __param(2, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, nullable: true })),
    __param(3, (0, graphql_1.Args)('etage', { type: () => graphql_1.Int, nullable: true })),
    __param(4, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "findByImmeuble", null);
__decorate([
    (0, graphql_1.Query)(() => porte_dto_1.PorteStatistics, { name: 'porteStatistics' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "getStatistics", null);
__decorate([
    (0, graphql_1.Mutation)(() => porte_dto_1.Porte),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('updatePorteInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [porte_dto_1.UpdatePorteInput, Object]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "updatePorte", null);
__decorate([
    (0, graphql_1.Mutation)(() => porte_dto_1.Porte),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "removePorte", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('nbEtages', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('nbPortesParEtage', { type: () => graphql_1.Int })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PorteResolver.prototype, "createPortesForImmeuble", null);
__decorate([
    (0, graphql_1.Query)(() => [porte_dto_1.Porte], { name: 'portesModifiedToday' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "findModifiedToday", null);
__decorate([
    (0, graphql_1.Query)(() => [porte_dto_1.Porte], { name: 'portesRdvToday' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "findRdvToday", null);
__decorate([
    (0, graphql_1.Query)(() => [porte_dto_1.StatusHistorique], { name: 'statusHistoriqueByPorte' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('porteId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "getStatusHistoriqueByPorte", null);
__decorate([
    (0, graphql_1.Query)(() => [porte_dto_1.StatusHistorique], { name: 'statusHistoriqueByImmeuble' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PorteResolver.prototype, "getStatusHistoriqueByImmeuble", null);
exports.PorteResolver = PorteResolver = __decorate([
    (0, graphql_1.Resolver)(() => porte_dto_1.Porte),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [porte_service_1.PorteService])
], PorteResolver);
//# sourceMappingURL=porte.resolver.js.map