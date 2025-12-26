"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioMonitoringModule = void 0;
const common_1 = require("@nestjs/common");
const audio_monitoring_service_1 = require("./audio-monitoring.service");
const audio_monitoring_resolver_1 = require("./audio-monitoring.resolver");
const livekit_service_1 = require("./livekit.service");
const prisma_service_1 = require("../prisma.service");
let AudioMonitoringModule = class AudioMonitoringModule {
};
exports.AudioMonitoringModule = AudioMonitoringModule;
exports.AudioMonitoringModule = AudioMonitoringModule = __decorate([
    (0, common_1.Module)({
        providers: [audio_monitoring_service_1.AudioMonitoringService, audio_monitoring_resolver_1.AudioMonitoringResolver, livekit_service_1.LiveKitService, prisma_service_1.PrismaService],
        exports: [audio_monitoring_service_1.AudioMonitoringService, livekit_service_1.LiveKitService],
    })
], AudioMonitoringModule);
//# sourceMappingURL=audio-monitoring.module.js.map