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
exports.ManagerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const manager_service_1 = require("./manager.service");
const manager_dto_1 = require("./manager.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let ManagerResolver = class ManagerResolver {
    managerService;
    constructor(managerService) {
        this.managerService = managerService;
    }
    createManager(createManagerInput) {
        return this.managerService.create(createManagerInput);
    }
    findAll(user) {
        return this.managerService.findAll(user.id, user.role);
    }
    findOne(id, user) {
        return this.managerService.findOne(id, user.id, user.role);
    }
    findPersonal(id, user) {
        return this.managerService.findPersonal(id, user.id, user.role);
    }
    findFull(id, user) {
        return this.managerService.findFull(id, user.id, user.role);
    }
    updateManager(updateManagerInput, user) {
        return this.managerService.update(updateManagerInput, user.id, user.role);
    }
    removeManager(id, user) {
        return this.managerService.remove(id, user.id, user.role);
    }
};
exports.ManagerResolver = ManagerResolver;
__decorate([
    (0, graphql_1.Mutation)(() => manager_dto_1.Manager),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('createManagerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.CreateManagerInput]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "createManager", null);
__decorate([
    (0, graphql_1.Query)(() => [manager_dto_1.Manager], { name: 'managers' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => manager_dto_1.Manager, { name: 'manager' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => manager_dto_1.Manager, { name: 'managerPersonal', nullable: true }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "findPersonal", null);
__decorate([
    (0, graphql_1.Query)(() => manager_dto_1.Manager, { name: 'managerFull', nullable: true }),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "findFull", null);
__decorate([
    (0, graphql_1.Mutation)(() => manager_dto_1.Manager),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('updateManagerInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.UpdateManagerInput, Object]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "updateManager", null);
__decorate([
    (0, graphql_1.Mutation)(() => manager_dto_1.Manager),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerResolver.prototype, "removeManager", null);
exports.ManagerResolver = ManagerResolver = __decorate([
    (0, graphql_1.Resolver)(() => manager_dto_1.Manager),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerResolver);
//# sourceMappingURL=manager.resolver.js.map