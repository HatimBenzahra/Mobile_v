"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorteModule = void 0;
const common_1 = require("@nestjs/common");
const porte_service_1 = require("./porte.service");
const porte_resolver_1 = require("./porte.resolver");
const prisma_service_1 = require("../prisma.service");
const statistic_module_1 = require("../statistic/statistic.module");
let PorteModule = class PorteModule {
};
exports.PorteModule = PorteModule;
exports.PorteModule = PorteModule = __decorate([
    (0, common_1.Module)({
        imports: [statistic_module_1.StatisticModule],
        providers: [porte_resolver_1.PorteResolver, porte_service_1.PorteService, prisma_service_1.PrismaService],
        exports: [porte_service_1.PorteService],
    })
], PorteModule);
//# sourceMappingURL=porte.module.js.map