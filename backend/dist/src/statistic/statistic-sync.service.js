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
var StatisticSyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticSyncService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const porte_dto_1 = require("../porte/porte.dto");
let StatisticSyncService = StatisticSyncService_1 = class StatisticSyncService {
    prisma;
    logger = new common_1.Logger(StatisticSyncService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async syncCommercialStats(immeubleId) {
        try {
            const immeuble = await this.prisma.immeuble.findUnique({
                where: { id: immeubleId },
                include: {
                    commercial: true,
                    manager: true
                }
            });
            if (!immeuble?.commercial && !immeuble?.manager) {
                this.logger.warn(`Immeuble ${immeubleId} n'a ni commercial ni manager associé`);
                return;
            }
            if (immeuble.commercial) {
                const commercialId = immeuble.commercial.id;
                const realStats = await this.calculateRealStats(commercialId);
                await this.upsertStatistic(commercialId, realStats);
                this.logger.debug(`Stats mises à jour pour commercial ${commercialId}:`, realStats);
                if (immeuble.commercial.managerId) {
                    await this.syncManagerStats(immeuble.commercial.managerId);
                }
                else if (immeuble.commercial.directeurId) {
                    await this.syncDirecteurStats(immeuble.commercial.directeurId);
                }
            }
            if (immeuble.managerId) {
                await this.syncManagerStats(immeuble.managerId);
            }
        }
        catch (error) {
            this.logger.error(`Erreur sync stats pour immeuble ${immeubleId}:`, error);
            throw error;
        }
    }
    async syncManagerStats(managerId) {
        try {
            const realStats = await this.calculateManagerRealStats(managerId);
            await this.upsertManagerStatistic(managerId, realStats);
            this.logger.debug(`Stats mises à jour pour manager ${managerId}:`, realStats);
            const manager = await this.prisma.manager.findUnique({
                where: { id: managerId },
                select: { directeurId: true }
            });
            if (manager?.directeurId) {
                await this.syncDirecteurStats(manager.directeurId);
            }
        }
        catch (error) {
            this.logger.error(`Erreur sync stats pour manager ${managerId}:`, error);
            throw error;
        }
    }
    async syncDirecteurStats(directeurId) {
        try {
            const realStats = await this.calculateDirecteurRealStats(directeurId);
            await this.upsertDirecteurStatistic(directeurId, realStats);
            this.logger.debug(`Stats mises à jour pour directeur ${directeurId}:`, realStats);
        }
        catch (error) {
            this.logger.error(`Erreur sync stats pour directeur ${directeurId}:`, error);
            throw error;
        }
    }
    async calculateRealStats(commercialId) {
        const result = await this.prisma.porte.groupBy({
            by: ['statut'],
            where: {
                immeuble: {
                    commercialId: commercialId
                }
            },
            _count: {
                statut: true
            }
        });
        const immeublesVisites = await this.prisma.immeuble.count({
            where: {
                commercialId: commercialId,
                portes: {
                    some: {
                        statut: {
                            not: porte_dto_1.StatutPorte.NON_VISITE
                        }
                    }
                }
            }
        });
        const stats = {
            contratsSignes: 0,
            rendezVousPris: 0,
            refus: 0,
            immeublesVisites: immeublesVisites,
            nbImmeublesProspectes: immeublesVisites,
            nbPortesProspectes: 0
        };
        result.forEach(group => {
            const count = group._count.statut;
            switch (group.statut) {
                case porte_dto_1.StatutPorte.CONTRAT_SIGNE:
                    stats.contratsSignes += count;
                    stats.nbPortesProspectes += count;
                    break;
                case porte_dto_1.StatutPorte.RENDEZ_VOUS_PRIS:
                    stats.rendezVousPris += count;
                    stats.nbPortesProspectes += count;
                    break;
                case porte_dto_1.StatutPorte.REFUS:
                    stats.refus += count;
                    stats.nbPortesProspectes += count;
                    break;
                case porte_dto_1.StatutPorte.CURIEUX:
                case porte_dto_1.StatutPorte.NECESSITE_REPASSAGE:
                    stats.nbPortesProspectes += count;
                    break;
            }
        });
        return stats;
    }
    async calculateManagerRealStats(managerId) {
        const result = await this.prisma.porte.groupBy({
            by: ['statut'],
            where: {
                immeuble: {
                    managerId: managerId
                }
            },
            _count: {
                statut: true
            }
        });
        const immeublesVisites = await this.prisma.immeuble.count({
            where: {
                managerId: managerId,
                portes: {
                    some: {
                        statut: {
                            not: porte_dto_1.StatutPorte.NON_VISITE
                        }
                    }
                }
            }
        });
        const stats = {
            contratsSignes: 0,
            rendezVousPris: 0,
            refus: 0,
            immeublesVisites: immeublesVisites,
            nbImmeublesProspectes: immeublesVisites,
            nbPortesProspectes: 0
        };
        result.forEach(group => {
            const count = group._count.statut;
            switch (group.statut) {
                case porte_dto_1.StatutPorte.CONTRAT_SIGNE:
                    stats.contratsSignes += count;
                    stats.nbPortesProspectes += count;
                    break;
                case porte_dto_1.StatutPorte.RENDEZ_VOUS_PRIS:
                    stats.rendezVousPris += count;
                    stats.nbPortesProspectes += count;
                    break;
                case porte_dto_1.StatutPorte.REFUS:
                    stats.refus += count;
                    stats.nbPortesProspectes += count;
                    break;
                case porte_dto_1.StatutPorte.CURIEUX:
                case porte_dto_1.StatutPorte.NECESSITE_REPASSAGE:
                    stats.nbPortesProspectes += count;
                    break;
            }
        });
        return stats;
    }
    async calculateDirecteurRealStats(directeurId) {
        const managerStats = await this.prisma.statistic.aggregate({
            where: {
                manager: {
                    directeurId: directeurId
                }
            },
            _sum: {
                contratsSignes: true,
                rendezVousPris: true,
                refus: true,
                immeublesVisites: true,
                nbImmeublesProspectes: true,
                nbPortesProspectes: true,
            }
        });
        const commercialStats = await this.prisma.statistic.aggregate({
            where: {
                commercial: {
                    directeurId: directeurId
                }
            },
            _sum: {
                contratsSignes: true,
                rendezVousPris: true,
                refus: true,
                immeublesVisites: true,
                nbImmeublesProspectes: true,
                nbPortesProspectes: true,
            }
        });
        const stats = {
            contratsSignes: (managerStats._sum.contratsSignes || 0) + (commercialStats._sum.contratsSignes || 0),
            rendezVousPris: (managerStats._sum.rendezVousPris || 0) + (commercialStats._sum.rendezVousPris || 0),
            refus: (managerStats._sum.refus || 0) + (commercialStats._sum.refus || 0),
            immeublesVisites: (managerStats._sum.immeublesVisites || 0) + (commercialStats._sum.immeublesVisites || 0),
            nbImmeublesProspectes: (managerStats._sum.nbImmeublesProspectes || 0) + (commercialStats._sum.nbImmeublesProspectes || 0),
            nbPortesProspectes: (managerStats._sum.nbPortesProspectes || 0) + (commercialStats._sum.nbPortesProspectes || 0),
        };
        return stats;
    }
    async upsertStatistic(commercialId, stats) {
        const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
            where: {
                userId_userType: {
                    userId: commercialId,
                    userType: 'COMMERCIAL',
                },
            },
        });
        const zoneId = zoneEnCours?.zoneId || null;
        const existingStat = await this.prisma.statistic.findFirst({
            where: { commercialId: commercialId }
        });
        if (existingStat) {
            return this.prisma.statistic.update({
                where: { id: existingStat.id },
                data: {
                    ...stats,
                    zoneId,
                    updatedAt: new Date()
                }
            });
        }
        else {
            return this.prisma.statistic.create({
                data: {
                    commercialId: commercialId,
                    zoneId,
                    ...stats
                }
            });
        }
    }
    async upsertManagerStatistic(managerId, stats) {
        const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
            where: {
                userId_userType: {
                    userId: managerId,
                    userType: 'MANAGER',
                },
            },
        });
        const zoneId = zoneEnCours?.zoneId || null;
        const existingStat = await this.prisma.statistic.findFirst({
            where: { managerId: managerId }
        });
        if (existingStat) {
            return this.prisma.statistic.update({
                where: { id: existingStat.id },
                data: {
                    ...stats,
                    zoneId,
                    updatedAt: new Date()
                }
            });
        }
        else {
            return this.prisma.statistic.create({
                data: {
                    managerId: managerId,
                    zoneId,
                    ...stats
                }
            });
        }
    }
    async upsertDirecteurStatistic(directeurId, stats) {
        const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
            where: {
                userId_userType: {
                    userId: directeurId,
                    userType: 'DIRECTEUR',
                },
            },
        });
        const zoneId = zoneEnCours?.zoneId || null;
        const existingStat = await this.prisma.statistic.findFirst({
            where: { directeurId: directeurId }
        });
        if (existingStat) {
            return this.prisma.statistic.update({
                where: { id: existingStat.id },
                data: {
                    ...stats,
                    zoneId,
                    updatedAt: new Date()
                }
            });
        }
        else {
            return this.prisma.statistic.create({
                data: {
                    directeurId: directeurId,
                    zoneId,
                    ...stats
                }
            });
        }
    }
    async recalculateAllStats() {
        let updated = 0;
        let errors = 0;
        try {
            const commerciaux = await this.prisma.commercial.findMany({
                select: { id: true }
            });
            for (const commercial of commerciaux) {
                try {
                    const stats = await this.calculateRealStats(commercial.id);
                    await this.upsertStatistic(commercial.id, stats);
                    updated++;
                }
                catch (error) {
                    this.logger.error(`Erreur recalcul stats commercial ${commercial.id}:`, error);
                    errors++;
                }
            }
            const managers = await this.prisma.manager.findMany({
                select: { id: true }
            });
            for (const manager of managers) {
                try {
                    const stats = await this.calculateManagerRealStats(manager.id);
                    await this.upsertManagerStatistic(manager.id, stats);
                    updated++;
                }
                catch (error) {
                    this.logger.error(`Erreur recalcul stats manager ${manager.id}:`, error);
                    errors++;
                }
            }
            const directeurs = await this.prisma.directeur.findMany({
                select: { id: true }
            });
            for (const directeur of directeurs) {
                try {
                    const stats = await this.calculateDirecteurRealStats(directeur.id);
                    await this.upsertDirecteurStatistic(directeur.id, stats);
                    updated++;
                }
                catch (error) {
                    this.logger.error(`Erreur recalcul stats directeur ${directeur.id}:`, error);
                    errors++;
                }
            }
            this.logger.log(`Recalcul terminé: ${updated} mis à jour, ${errors} erreurs`);
            return { updated, errors };
        }
        catch (error) {
            this.logger.error('Erreur générale recalcul stats:', error);
            throw error;
        }
    }
    async validateStatsCoherence() {
        const invalid = [];
        let valid = 0;
        try {
            const statistics = await this.prisma.statistic.findMany({
                include: { commercial: true }
            });
            for (const stat of statistics) {
                if (!stat.commercialId)
                    continue;
                const realStats = await this.calculateRealStats(stat.commercialId);
                const isValid = (stat.contratsSignes === realStats.contratsSignes &&
                    stat.rendezVousPris === realStats.rendezVousPris &&
                    stat.refus === realStats.refus &&
                    stat.immeublesVisites === realStats.immeublesVisites);
                if (isValid) {
                    valid++;
                }
                else {
                    invalid.push({
                        commercialId: stat.commercialId,
                        commercial: stat.commercial?.nom + ' ' + stat.commercial?.prenom,
                        current: {
                            contratsSignes: stat.contratsSignes,
                            rendezVousPris: stat.rendezVousPris,
                            refus: stat.refus,
                            immeublesVisites: stat.immeublesVisites
                        },
                        real: realStats
                    });
                }
            }
            return { valid, invalid };
        }
        catch (error) {
            this.logger.error('Erreur validation cohérence:', error);
            throw error;
        }
    }
};
exports.StatisticSyncService = StatisticSyncService;
exports.StatisticSyncService = StatisticSyncService = StatisticSyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticSyncService);
//# sourceMappingURL=statistic-sync.service.js.map