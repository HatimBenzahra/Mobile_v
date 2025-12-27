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
exports.AudioMonitoringResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const audio_monitoring_service_1 = require("./audio-monitoring.service");
const audio_monitoring_dto_1 = require("./audio-monitoring.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let AudioMonitoringResolver = class AudioMonitoringResolver {
    audioMonitoringService;
    constructor(audioMonitoringService) {
        this.audioMonitoringService = audioMonitoringService;
    }
    async startMonitoring(input, user) {
        return this.audioMonitoringService.startMonitoring(input, user);
    }
    async stopMonitoring(input, user) {
        return this.audioMonitoringService.stopMonitoring(input.sessionId, user);
    }
    async getActiveSessions(user) {
        return this.audioMonitoringService.getActiveSessions(user);
    }
    async getActiveRooms(user) {
        return this.audioMonitoringService.getActiveRooms(user);
    }
    async generateCommercialToken(commercialId, roomName, user) {
        return this.audioMonitoringService.generateCommercialToken(commercialId, roomName, user);
    }
    async generateManagerToken(managerId, roomName, user) {
        return this.audioMonitoringService.generateManagerToken(managerId, roomName, user);
    }
    async logAudioEvent(eventType, message, details, user) {
        return this.audioMonitoringService.logAudioEvent(eventType, message, details, user);
    }
};
exports.AudioMonitoringResolver = AudioMonitoringResolver;
__decorate([
    (0, graphql_1.Mutation)(() => audio_monitoring_dto_1.LiveKitConnectionDetails),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audio_monitoring_dto_1.StartMonitoringInput, Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "startMonitoring", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audio_monitoring_dto_1.StopMonitoringInput, Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "stopMonitoring", null);
__decorate([
    (0, graphql_1.Query)(() => [audio_monitoring_dto_1.MonitoringSession]),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "getActiveSessions", null);
__decorate([
    (0, graphql_1.Query)(() => [audio_monitoring_dto_1.ActiveRoom]),
    (0, roles_decorator_1.Roles)('admin', 'directeur', 'manager'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "getActiveRooms", null);
__decorate([
    (0, graphql_1.Mutation)(() => audio_monitoring_dto_1.LiveKitConnectionDetails),
    (0, roles_decorator_1.Roles)('commercial'),
    __param(0, (0, graphql_1.Args)('commercialId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('roomName', { nullable: true })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "generateCommercialToken", null);
__decorate([
    (0, graphql_1.Mutation)(() => audio_monitoring_dto_1.LiveKitConnectionDetails),
    (0, roles_decorator_1.Roles)('manager'),
    __param(0, (0, graphql_1.Args)('managerId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('roomName', { nullable: true })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "generateManagerToken", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('commercial', 'manager'),
    __param(0, (0, graphql_1.Args)('eventType')),
    __param(1, (0, graphql_1.Args)('message')),
    __param(2, (0, graphql_1.Args)('details', { nullable: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AudioMonitoringResolver.prototype, "logAudioEvent", null);
exports.AudioMonitoringResolver = AudioMonitoringResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [audio_monitoring_service_1.AudioMonitoringService])
], AudioMonitoringResolver);
//# sourceMappingURL=audio-monitoring.resolver.js.map