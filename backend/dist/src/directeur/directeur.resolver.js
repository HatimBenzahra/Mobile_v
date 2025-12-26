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
exports.DirecteurResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const directeur_service_1 = require("./directeur.service");
const directeur_dto_1 = require("./directeur.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let DirecteurResolver = class DirecteurResolver {
    directeurService;
    constructor(directeurService) {
        this.directeurService = directeurService;
    }
    createDirecteur(createDirecteurInput) {
        return this.directeurService.create(createDirecteurInput);
    }
    findAll(user) {
        return this.directeurService.findAll(user.id, user.role);
    }
    findOne(id, user) {
        return this.directeurService.findOne(id, user.id, user.role);
    }
    updateDirecteur(updateDirecteurInput, user) {
        return this.directeurService.update(updateDirecteurInput, user.id, user.role);
    }
    removeDirecteur(id, user) {
        return this.directeurService.remove(id, user.id, user.role);
    }
};
exports.DirecteurResolver = DirecteurResolver;
__decorate([
    (0, graphql_1.Mutation)(() => directeur_dto_1.Directeur),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('createDirecteurInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directeur_dto_1.CreateDirecteurInput]),
    __metadata("design:returntype", void 0)
], DirecteurResolver.prototype, "createDirecteur", null);
__decorate([
    (0, graphql_1.Query)(() => [directeur_dto_1.Directeur], { name: 'directeurs' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DirecteurResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => directeur_dto_1.Directeur, { name: 'directeur' }),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DirecteurResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => directeur_dto_1.Directeur),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('updateDirecteurInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directeur_dto_1.UpdateDirecteurInput, Object]),
    __metadata("design:returntype", void 0)
], DirecteurResolver.prototype, "updateDirecteur", null);
__decorate([
    (0, graphql_1.Mutation)(() => directeur_dto_1.Directeur),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DirecteurResolver.prototype, "removeDirecteur", null);
exports.DirecteurResolver = DirecteurResolver = __decorate([
    (0, graphql_1.Resolver)(() => directeur_dto_1.Directeur),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [directeur_service_1.DirecteurService])
], DirecteurResolver);
//# sourceMappingURL=directeur.resolver.js.map