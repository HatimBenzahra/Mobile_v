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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ManagerService = class ManagerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.manager.create({
            data,
            include: {
                directeur: true,
                commercials: true,
            },
        });
    }
    async findAll(userId, userRole) {
        if (userId === undefined || !userRole) {
            return this.prisma.manager.findMany({
                include: {
                    directeur: true,
                    commercials: true,
                },
            });
        }
        switch (userRole) {
            case 'admin':
                return this.prisma.manager.findMany({
                    include: {
                        directeur: true,
                        commercials: true,
                        statistics: true,
                    },
                });
            case 'directeur':
                return this.prisma.manager.findMany({
                    where: {
                        directeurId: userId,
                    },
                    include: {
                        directeur: true,
                        commercials: true,
                        statistics: true,
                    },
                });
            case 'manager':
                return this.prisma.manager.findMany({
                    where: {
                        id: userId,
                    },
                    include: {
                        directeur: true,
                        commercials: true,
                    },
                });
            default:
                return [];
        }
    }
    async findOne(id, userId, userRole) {
        if (userRole === 'admin') {
            return this.prisma.manager.findUnique({
                where: { id },
                include: {
                    directeur: true,
                    commercials: true,
                    zones: true,
                },
            });
        }
        const manager = await this.prisma.manager.findUnique({
            where: { id },
            include: {
                directeur: true,
                commercials: true,
                zones: true,
            },
        });
        if (!manager) {
            throw new common_1.NotFoundException('Manager not found');
        }
        if (userRole === 'directeur' && manager.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager' && manager.id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return manager;
    }
    async findPersonal(id, userId, userRole) {
        if (userRole === 'admin') {
            const manager = await this.prisma.manager.findUnique({
                where: { id },
                include: {
                    directeur: true,
                },
            });
            if (!manager) {
                return null;
            }
            const immeubles = await this.prisma.immeuble.findMany({
                where: { managerId: id },
                include: {
                    portes: true,
                },
            });
            const statistics = await this.prisma.statistic.findMany({
                where: { managerId: id },
            });
            const zones = await this.prisma.zone.findMany({
                where: { managerId: id },
                include: {
                    immeubles: true,
                },
            });
            return {
                ...manager,
                immeubles,
                statistics,
                zones,
            };
        }
        const manager = await this.prisma.manager.findUnique({
            where: { id },
            include: {
                directeur: true,
            },
        });
        if (!manager) {
            return null;
        }
        if (userRole === 'directeur' && manager.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager' && manager.id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const immeubles = await this.prisma.immeuble.findMany({
            where: { managerId: id },
            include: {
                portes: true,
            },
        });
        const statistics = await this.prisma.statistic.findMany({
            where: { managerId: id },
        });
        const zones = await this.prisma.zone.findMany({
            where: { managerId: id },
            include: {
                immeubles: true,
            },
        });
        return {
            ...manager,
            immeubles,
            statistics,
            zones,
        };
    }
    async findFull(id, userId, userRole) {
        const managerData = await this.prisma.manager.findUnique({
            where: { id },
            include: {
                directeur: false,
                zones: {
                    include: {
                        immeubles: {
                            include: {
                                portes: true,
                            },
                        },
                        statistics: true,
                    },
                },
                commercials: {
                    include: {
                        statistics: true,
                        immeubles: {
                            include: {
                                portes: true,
                            },
                        },
                    },
                },
            },
        });
        if (!managerData) {
            return null;
        }
        if (userRole !== 'admin') {
            const managerForAuth = await this.prisma.manager.findUnique({
                where: { id },
                select: { directeurId: true },
            });
            if (userRole === 'directeur' && managerForAuth?.directeurId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (userRole === 'manager' && id !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        const managerImmeubles = await this.prisma.immeuble.findMany({
            where: { managerId: id },
            include: {
                portes: true,
            },
        });
        const managerStatistics = await this.prisma.statistic.findMany({
            where: { managerId: id },
        });
        const commercialImmeubles = managerData.commercials?.flatMap((commercial) => commercial.immeubles || []) || [];
        const aggregatedImmeubles = [...managerImmeubles, ...commercialImmeubles];
        const commercialStatistics = managerData.commercials?.flatMap((commercial) => commercial.statistics || []) || [];
        const aggregatedStatistics = [
            ...managerStatistics,
            ...commercialStatistics,
        ];
        return {
            ...managerData,
            immeubles: aggregatedImmeubles,
            statistics: aggregatedStatistics,
            personalStatistics: managerStatistics,
            teamStatistics: commercialStatistics,
        };
    }
    async update(data, userId, userRole) {
        const { id, ...updateData } = data;
        if (userRole === 'admin') {
            return this.prisma.manager.update({
                where: { id },
                data: updateData,
                include: {
                    directeur: true,
                    commercials: true,
                },
            });
        }
        const manager = await this.prisma.manager.findUnique({
            where: { id },
            select: { directeurId: true },
        });
        if (!manager) {
            throw new common_1.NotFoundException('Manager not found');
        }
        if (userRole === 'directeur' && manager.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return this.prisma.manager.update({
            where: { id },
            data: updateData,
            include: {
                directeur: true,
                commercials: true,
            },
        });
    }
    async remove(id, userId, userRole) {
        if (userRole === 'admin') {
            return this.prisma.manager.delete({
                where: { id },
                include: {
                    directeur: true,
                    commercials: true,
                },
            });
        }
        const manager = await this.prisma.manager.findUnique({
            where: { id },
            select: { directeurId: true },
        });
        if (!manager) {
            throw new common_1.NotFoundException('Manager not found');
        }
        if (userRole === 'directeur' && manager.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return this.prisma.manager.delete({
            where: { id },
            include: {
                directeur: true,
                commercials: true,
            },
        });
    }
};
exports.ManagerService = ManagerService;
exports.ManagerService = ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManagerService);
//# sourceMappingURL=manager.service.js.map