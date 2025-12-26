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
exports.RecordingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const recording_dto_1 = require("./recording.dto");
const recording_service_1 = require("./recording.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let RecordingResolver = class RecordingResolver {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async startRecording(input, user) {
        return this.svc.startRecording(input, user);
    }
    async stopRecording(input, user) {
        return this.svc.stopRecording(input.egressId, user);
    }
    async listRecordings(roomName, user) {
        return this.svc.listRecordings(roomName, user);
    }
    async egressState(egressId, user) {
        return this.svc.egressState(egressId, user);
    }
    async getStreamingUrl(key, user) {
        return this.svc.getStreamingUrl(key, user);
    }
};
exports.RecordingResolver = RecordingResolver;
__decorate([
    (0, graphql_1.Mutation)(() => recording_dto_1.RecordingResult),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recording_dto_1.StartRecordingInput, Object]),
    __metadata("design:returntype", Promise)
], RecordingResolver.prototype, "startRecording", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager', 'commercial'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recording_dto_1.StopRecordingInput, Object]),
    __metadata("design:returntype", Promise)
], RecordingResolver.prototype, "stopRecording", null);
__decorate([
    (0, graphql_1.Query)(() => [recording_dto_1.RecordingItem]),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('roomName')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecordingResolver.prototype, "listRecordings", null);
__decorate([
    (0, graphql_1.Query)(() => recording_dto_1.EgressState),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('egressId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecordingResolver.prototype, "egressState", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    (0, roles_decorator_1.Roles)('admin', 'directeur'),
    __param(0, (0, graphql_1.Args)('key')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecordingResolver.prototype, "getStreamingUrl", null);
exports.RecordingResolver = RecordingResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [recording_service_1.RecordingService])
], RecordingResolver);
//# sourceMappingURL=recording.resolver.js.map