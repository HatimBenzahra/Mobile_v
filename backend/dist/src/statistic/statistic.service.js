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
exports.StatisticService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const porte_status_constants_1 = require("../porte/porte-status.constants");
let StatisticService = class StatisticService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertStatisticAccess(statisticId, userId, userRole) {
        const statistic = await this.prisma.statistic.findUnique({
            where: { id: statisticId },
            include: {
                commercial: {
                    select: { id: true, managerId: true, directeurId: true },
                },
                manager: {
                    select: { id: true, directeurId: true },
                },
            },
        });
        if (!statistic) {
            throw new common_1.NotFoundException('Statistic not found');
        }
        if (userRole === 'admin') {
            return statistic;
        }
        if (userRole === 'commercial' &&
            statistic.commercialId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager') {
            const ownsStatistic = statistic.managerId === userId ||
                statistic.commercial?.managerId === userId;
            if (!ownsStatistic) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        if (userRole === 'directeur') {
            const ownsStatistic = statistic.manager?.directeurId === userId ||
                statistic.commercial?.directeurId === userId;
            if (!ownsStatistic) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        return statistic;
    }
    async ensureImmeubleAccess(immeubleId, userId, userRole) {
        const immeuble = await this.prisma.immeuble.findUnique({
            where: { id: immeubleId },
            include: {
                commercial: {
                    select: { id: true, managerId: true, directeurId: true },
                },
                manager: {
                    select: { id: true, directeurId: true },
                },
                zone: {
                    select: { id: true, managerId: true, directeurId: true },
                },
            },
        });
        if (!immeuble) {
            throw new common_1.NotFoundException('Immeuble not found');
        }
        if (userRole === 'admin') {
            return;
        }
        if (userRole === 'commercial' && immeuble.commercialId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager') {
            const ownsImmeuble = immeuble.managerId === userId ||
                immeuble.commercial?.managerId === userId ||
                immeuble.zone?.managerId === userId;
            if (!ownsImmeuble) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        if (userRole === 'directeur') {
            const ownsImmeuble = immeuble.manager?.directeurId === userId ||
                immeuble.commercial?.directeurId === userId ||
                immeuble.zone?.directeurId === userId;
            if (!ownsImmeuble) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
    }
    async create(data) {
        return this.prisma.statistic.create({
            data,
            include: {
                commercial: true,
                manager: true,
            },
        });
    }
    async findAll(commercialId, userId, userRole) {
        let whereConditions = {};
        if (commercialId) {
            whereConditions.commercialId = commercialId;
        }
        if (userId && userRole) {
            switch (userRole) {
                case 'admin':
                    break;
                case 'directeur':
                    whereConditions.OR = [
                        {
                            commercial: {
                                directeurId: userId,
                            },
                        },
                        {
                            manager: {
                                directeurId: userId,
                            },
                        },
                    ];
                    break;
                case 'manager':
                    whereConditions.OR = [
                        {
                            commercial: {
                                managerId: userId,
                            },
                        },
                        {
                            managerId: userId,
                        },
                    ];
                    break;
                case 'commercial':
                    whereConditions.commercialId = userId;
                    break;
                default:
                    return [];
            }
        }
        return this.prisma.statistic.findMany({
            where: whereConditions,
            include: {
                commercial: true,
                manager: true,
            },
        });
    }
    async findOne(id, userId, userRole) {
        await this.assertStatisticAccess(id, userId, userRole);
        return this.prisma.statistic.findUnique({
            where: { id },
            include: {
                commercial: true,
                manager: true,
            },
        });
    }
    async update(data, userId, userRole) {
        const { id, ...updateData } = data;
        const statistic = await this.assertStatisticAccess(id, userId, userRole);
        if (userRole !== 'admin') {
            if (updateData.commercialId &&
                updateData.commercialId !== statistic.commercialId) {
                throw new common_1.ForbiddenException('Cannot reassign statistic owner');
            }
            if (updateData.managerId &&
                updateData.managerId !== statistic.managerId) {
                throw new common_1.ForbiddenException('Cannot reassign statistic owner');
            }
        }
        return this.prisma.statistic.update({
            where: { id },
            data: updateData,
            include: {
                commercial: true,
                manager: true,
            },
        });
    }
    async remove(id, userId, userRole) {
        await this.assertStatisticAccess(id, userId, userRole);
        return this.prisma.statistic.delete({
            where: { id },
            include: {
                commercial: true,
                manager: true,
            },
        });
    }
    async getZoneStatistics(userId, userRole) {
        const currentAssignments = await this.prisma.zoneEnCours.findMany({
            include: {
                zone: true,
            },
        });
        const historyAssignments = await this.prisma.historiqueZone.findMany({
            include: {
                zone: true,
            },
        });
        let allZoneIds = new Set();
        currentAssignments.forEach((a) => allZoneIds.add(a.zoneId));
        historyAssignments.forEach((h) => allZoneIds.add(h.zoneId));
        if (userId && userRole && userRole !== 'admin') {
            const authorizedZoneIds = new Set();
            switch (userRole) {
                case 'commercial':
                    currentAssignments
                        .filter((a) => a.userId === userId && a.userType === 'COMMERCIAL')
                        .forEach((a) => authorizedZoneIds.add(a.zoneId));
                    historyAssignments
                        .filter((h) => h.userId === userId && h.userType === 'COMMERCIAL')
                        .forEach((h) => authorizedZoneIds.add(h.zoneId));
                    break;
                case 'manager':
                    const managerCommercials = await this.prisma.commercial.findMany({
                        where: { managerId: userId },
                        select: { id: true },
                    });
                    const commercialIds = managerCommercials.map((c) => c.id);
                    currentAssignments
                        .filter((a) => a.userId === userId && a.userType === 'MANAGER')
                        .forEach((a) => authorizedZoneIds.add(a.zoneId));
                    historyAssignments
                        .filter((h) => h.userId === userId && h.userType === 'MANAGER')
                        .forEach((h) => authorizedZoneIds.add(h.zoneId));
                    currentAssignments
                        .filter((a) => commercialIds.includes(a.userId) &&
                        a.userType === 'COMMERCIAL')
                        .forEach((a) => authorizedZoneIds.add(a.zoneId));
                    historyAssignments
                        .filter((h) => commercialIds.includes(h.userId) &&
                        h.userType === 'COMMERCIAL')
                        .forEach((h) => authorizedZoneIds.add(h.zoneId));
                    break;
                case 'directeur':
                    const directeurManagers = await this.prisma.manager.findMany({
                        where: { directeurId: userId },
                        select: { id: true },
                    });
                    const managerIds = directeurManagers.map((m) => m.id);
                    const directeurCommercials = await this.prisma.commercial.findMany({
                        where: {
                            OR: [{ directeurId: userId }, { managerId: { in: managerIds } }],
                        },
                        select: { id: true },
                    });
                    const directeurCommercialIds = directeurCommercials.map((c) => c.id);
                    currentAssignments
                        .filter((a) => a.userId === userId && a.userType === 'DIRECTEUR')
                        .forEach((a) => authorizedZoneIds.add(a.zoneId));
                    historyAssignments
                        .filter((h) => h.userId === userId && h.userType === 'DIRECTEUR')
                        .forEach((h) => authorizedZoneIds.add(h.zoneId));
                    currentAssignments
                        .filter((a) => managerIds.includes(a.userId) && a.userType === 'MANAGER')
                        .forEach((a) => authorizedZoneIds.add(a.zoneId));
                    historyAssignments
                        .filter((h) => managerIds.includes(h.userId) && h.userType === 'MANAGER')
                        .forEach((h) => authorizedZoneIds.add(h.zoneId));
                    currentAssignments
                        .filter((a) => directeurCommercialIds.includes(a.userId) &&
                        a.userType === 'COMMERCIAL')
                        .forEach((a) => authorizedZoneIds.add(a.zoneId));
                    historyAssignments
                        .filter((h) => directeurCommercialIds.includes(h.userId) &&
                        h.userType === 'COMMERCIAL')
                        .forEach((h) => authorizedZoneIds.add(h.zoneId));
                    break;
                default:
                    return [];
            }
            allZoneIds = authorizedZoneIds;
        }
        const zones = await this.prisma.zone.findMany({
            where: {
                id: { in: Array.from(allZoneIds) },
            },
        });
        const zoneStatistics = await Promise.all(zones.map(async (zone) => {
            const portesGroupedByStatut = await this.prisma.porte.groupBy({
                by: ['statut'],
                where: {
                    immeuble: {
                        zoneId: zone.id,
                    },
                },
                _count: {
                    statut: true,
                },
            });
            let totalStats = {
                contratsSignes: 0,
                immeublesVisites: 0,
                rendezVousPris: 0,
                refus: 0,
                immeublesProspectes: 0,
                portesProspectes: 0,
            };
            portesGroupedByStatut.forEach((group) => {
                const count = group._count.statut;
                const statusStats = (0, porte_status_constants_1.calculateStatsForStatus)(group.statut, count);
                totalStats.contratsSignes += statusStats.contratsSignes;
                totalStats.rendezVousPris += statusStats.rendezVousPris;
                totalStats.refus += statusStats.refus;
                totalStats.portesProspectes += statusStats.nbPortesProspectes;
            });
            const immeublesVisites = await this.prisma.immeuble.count({
                where: {
                    zoneId: zone.id,
                    portes: {
                        some: {
                            statut: {
                                not: 'NON_VISITE',
                            },
                        },
                    },
                },
            });
            totalStats.immeublesVisites = immeublesVisites;
            totalStats.immeublesProspectes = immeublesVisites;
            const usersInZone = new Set();
            const zoneCurrentAssignments = currentAssignments.filter((a) => a.zoneId === zone.id);
            zoneCurrentAssignments.forEach((assignment) => {
                usersInZone.add(assignment.userId);
            });
            const zoneHistory = historyAssignments.filter((h) => h.zoneId === zone.id);
            zoneHistory.forEach((history) => {
                usersInZone.add(history.userId);
            });
            const totalContratsSignes = totalStats.contratsSignes;
            const totalImmeublesVisites = totalStats.immeublesVisites;
            const totalRendezVousPris = totalStats.rendezVousPris;
            const totalRefus = totalStats.refus;
            const totalImmeublesProspectes = totalStats.immeublesProspectes;
            const totalPortesProspectes = totalStats.portesProspectes;
            const tauxConversion = totalRefus + totalRendezVousPris + totalContratsSignes > 0
                ? (totalContratsSignes /
                    (totalRefus + totalRendezVousPris + totalContratsSignes)) *
                    100
                : 0;
            const tauxSuccesRdv = totalImmeublesVisites > 0
                ? (totalRendezVousPris / totalImmeublesVisites) * 100
                : 0;
            const performanceGlobale = tauxConversion + tauxSuccesRdv;
            return {
                zoneId: zone.id,
                zoneName: zone.nom,
                totalContratsSignes,
                totalImmeublesVisites,
                totalRendezVousPris,
                totalRefus,
                totalImmeublesProspectes,
                totalPortesProspectes,
                tauxConversion: Math.round(tauxConversion * 100) / 100,
                tauxSuccesRdv: Math.round(tauxSuccesRdv * 100) / 100,
                nombreCommerciaux: usersInZone.size,
                performanceGlobale: Math.round(performanceGlobale * 100) / 100,
            };
        }));
        return zoneStatistics.sort((a, b) => b.performanceGlobale - a.performanceGlobale);
    }
    async ensureCanSyncCommercialStats(immeubleId, userId, userRole) {
        await this.ensureImmeubleAccess(immeubleId, userId, userRole);
    }
    async ensureCanSyncManagerStats(managerId, userId, userRole) {
        const manager = await this.prisma.manager.findUnique({
            where: { id: managerId },
            select: { id: true, directeurId: true },
        });
        if (!manager) {
            throw new common_1.NotFoundException('Manager not found');
        }
        if (userRole === 'admin') {
            return;
        }
        if (userRole === 'directeur' && manager.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager' && manager.id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
    }
};
exports.StatisticService = StatisticService;
exports.StatisticService = StatisticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticService);
//# sourceMappingURL=statistic.service.js.map