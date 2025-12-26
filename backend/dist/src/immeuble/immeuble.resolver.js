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
exports.ImmeubleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const immeuble_service_1 = require("./immeuble.service");
const immeuble_dto_1 = require("./immeuble.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let ImmeubleResolver = class ImmeubleResolver {
    immeubleService;
    constructor(immeubleService) {
        this.immeubleService = immeubleService;
    }
    createImmeuble(createImmeubleInput) {
        return this.immeubleService.create(createImmeubleInput);
    }
    findAll(user) {
        return this.immeubleService.findAll(user.id, user.role);
    }
    findOne(id, user) {
        return this.immeubleService.findOne(id, user.id, user.role);
    }
    updateImmeuble(updateImmeubleInput, user) {
        return this.immeubleService.update(updateImmeubleInput, user.id, user.role);
    }
    removeImmeuble(id, user) {
        return this.immeubleService.remove(id, user.id, user.role);
    }
    addPorteToEtage(immeubleId, etage, user) {
        return this.immeubleService.addPorteToEtage(immeubleId, etage, user.id, user.role);
    }
    removePorteFromEtage(immeubleId, etage, user) {
        return this.immeubleService.removePorteFromEtage(immeubleId, etage, user.id, user.role);
    }
    addEtageToImmeuble(id, user) {
        return this.immeubleService.addEtage(id, user.id, user.role);
    }
    removeEtageFromImmeuble(id, user) {
        return this.immeubleService.removeEtage(id, user.id, user.role);
    }
};
exports.ImmeubleResolver = ImmeubleResolver;
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('createImmeubleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [immeuble_dto_1.CreateImmeubleInput]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "createImmeuble", null);
__decorate([
    (0, graphql_1.Query)(() => [immeuble_dto_1.Immeuble], { name: 'immeubles' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => immeuble_dto_1.Immeuble, { name: 'immeuble' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('updateImmeubleInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [immeuble_dto_1.UpdateImmeubleInput, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "updateImmeuble", null);
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "removeImmeuble", null);
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('etage', { type: () => graphql_1.Int })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "addPorteToEtage", null);
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('immeubleId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('etage', { type: () => graphql_1.Int })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "removePorteFromEtage", null);
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "addEtageToImmeuble", null);
__decorate([
    (0, graphql_1.Mutation)(() => immeuble_dto_1.Immeuble),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ImmeubleResolver.prototype, "removeEtageFromImmeuble", null);
exports.ImmeubleResolver = ImmeubleResolver = __decorate([
    (0, graphql_1.Resolver)(() => immeuble_dto_1.Immeuble),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [immeuble_service_1.ImmeubleService])
], ImmeubleResolver);
//# sourceMappingURL=immeuble.resolver.js.map