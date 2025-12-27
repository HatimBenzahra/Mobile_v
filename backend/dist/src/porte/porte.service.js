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
exports.PorteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const porte_dto_1 = require("./porte.dto");
const statistic_sync_service_1 = require("../statistic/statistic-sync.service");
const porte_status_constants_1 = require("./porte-status.constants");
let PorteService = class PorteService {
    prisma;
    statisticSyncService;
    constructor(prisma, statisticSyncService) {
        this.prisma = prisma;
        this.statisticSyncService = statisticSyncService;
    }
    validateImmeubleOwnership(immeuble, userId, userRole) {
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
        this.validateImmeubleOwnership(immeuble, userId, userRole);
        return immeuble;
    }
    async ensurePorteAccess(porteId, userId, userRole) {
        const porte = await this.prisma.porte.findUnique({
            where: { id: porteId },
            include: {
                immeuble: {
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
                },
            },
        });
        if (!porte) {
            throw new common_1.NotFoundException('Porte not found');
        }
        this.validateImmeubleOwnership(porte.immeuble, userId, userRole);
        return porte;
    }
    buildImmeubleAccessFilter(userId, userRole) {
        switch (userRole) {
            case 'admin':
                return {};
            case 'directeur':
                return {
                    OR: [
                        { commercial: { directeurId: userId } },
                        { manager: { directeurId: userId } },
                        { zone: { directeurId: userId } },
                    ],
                };
            case 'manager':
                return {
                    OR: [
                        { managerId: userId },
                        { commercial: { managerId: userId } },
                        { zone: { managerId: userId } },
                    ],
                };
            case 'commercial':
                return {
                    commercialId: userId,
                };
            default:
                return { id: -1 };
        }
    }
    async create(createPorteInput) {
        return this.prisma.porte.create({
            data: createPorteInput,
        });
    }
    async findAll() {
        return this.prisma.porte.findMany({
            include: {
                immeuble: true,
            },
        });
    }
    async findOne(id, userId, userRole) {
        return this.ensurePorteAccess(id, userId, userRole);
    }
    async findByImmeuble(immeubleId, userId, userRole, skip, take, etage) {
        await this.ensureImmeubleAccess(immeubleId, userId, userRole);
        const where = { immeubleId };
        if (etage) {
            where.etage = etage;
        }
        return this.prisma.porte.findMany({
            where,
            orderBy: [{ etage: 'asc' }, { numero: 'asc' }],
            skip,
            take,
        });
    }
    async update(updatePorteInput, userId, userRole) {
        const { id, ...data } = updatePorteInput;
        const currentPorte = await this.ensurePorteAccess(id, userId, userRole);
        const oldStatut = currentPorte.statut;
        if (data.statut === porte_dto_1.StatutPorte.ABSENT) {
            if (currentPorte.statut !== data.statut) {
                data.nbRepassages = (currentPorte.nbRepassages || 0) + 1;
            }
        }
        const updatedPorte = await this.prisma.porte.update({
            where: { id },
            data,
            include: {
                immeuble: true,
            },
        });
        await this.prisma.immeuble.update({
            where: { id: updatedPorte.immeubleId },
            data: { updatedAt: new Date() },
        });
        if (data.statut && data.statut !== oldStatut) {
            try {
                await this.statisticSyncService.syncCommercialStats(updatedPorte.immeubleId);
            }
            catch (error) {
                console.error('Erreur sync statistiques:', error);
            }
            try {
                const immeuble = await this.prisma.immeuble.findUnique({
                    where: { id: updatedPorte.immeubleId },
                    select: { commercialId: true, managerId: true },
                });
                await this.prisma.statusHistorique.create({
                    data: {
                        porteId: id,
                        statut: data.statut,
                        commentaire: data.commentaire || null,
                        rdvDate: data.rdvDate || null,
                        rdvTime: data.rdvTime || null,
                        commercialId: userRole === 'commercial' ? userId : immeuble?.commercialId,
                        managerId: userRole === 'manager' ? userId : immeuble?.managerId,
                    },
                });
            }
            catch (error) {
                console.error('Erreur enregistrement historique:', error);
            }
        }
        return updatedPorte;
    }
    async remove(id, userId, userRole) {
        await this.ensurePorteAccess(id, userId, userRole);
        return this.prisma.porte.delete({
            where: { id },
        });
    }
    async createPortesForImmeuble(immeubleId, nbEtages, nbPortesParEtage, userId, userRole) {
        await this.ensureImmeubleAccess(immeubleId, userId, userRole);
        const portes = [];
        for (let etage = 1; etage <= nbEtages; etage++) {
            for (let porte = 1; porte <= nbPortesParEtage; porte++) {
                portes.push({
                    numero: `${etage}${porte.toString().padStart(2, '0')}`,
                    etage,
                    immeubleId,
                    statut: 'NON_VISITE',
                    nbRepassages: 0,
                });
            }
        }
        return this.prisma.porte.createMany({
            data: portes,
            skipDuplicates: true,
        });
    }
    async getStatistiquesPortes(immeubleId) {
        const whereClause = immeubleId ? { immeubleId } : {};
        const portesGrouped = await this.prisma.porte.groupBy({
            by: ['statut'],
            where: whereClause,
            _count: {
                statut: true,
            },
            _sum: {
                nbContrats: true,
            },
        });
        const totalPortes = await this.prisma.porte.count({ where: whereClause });
        const statusCounts = {};
        (0, porte_status_constants_1.getAllStatuses)().forEach(status => {
            statusCounts[status] = 0;
        });
        portesGrouped.forEach(group => {
            statusCounts[group.statut] = group._count.statut;
        });
        const contratsSignesGroup = portesGrouped.find(g => g.statut === porte_dto_1.StatutPorte.CONTRAT_SIGNE);
        const totalContratsSignes = contratsSignesGroup?._sum?.nbContrats || 0;
        const etagesGrouped = await this.prisma.porte.groupBy({
            by: ['etage'],
            where: whereClause,
            _count: {
                _all: true,
            },
            orderBy: {
                etage: 'asc',
            },
        });
        const portesParEtage = etagesGrouped.map(group => ({
            etage: group.etage,
            count: group._count._all,
        }));
        return {
            totalPortes,
            contratsSigne: totalContratsSignes,
            rdvPris: statusCounts[porte_dto_1.StatutPorte.RENDEZ_VOUS_PRIS],
            absent: statusCounts[porte_dto_1.StatutPorte.ABSENT],
            argumente: statusCounts[porte_dto_1.StatutPorte.ARGUMENTE],
            refus: statusCounts[porte_dto_1.StatutPorte.REFUS],
            nonVisitees: statusCounts[porte_dto_1.StatutPorte.NON_VISITE],
            necessiteRepassage: statusCounts[porte_dto_1.StatutPorte.NECESSITE_REPASSAGE],
            portesVisitees: totalPortes - statusCounts[porte_dto_1.StatutPorte.NON_VISITE],
            tauxConversion: totalPortes > 0
                ? ((totalContratsSignes / totalPortes) * 100).toFixed(2)
                : '0',
            portesParEtage,
        };
    }
    async findModifiedToday(immeubleId, userId, userRole) {
        if (userId === undefined || !userRole) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const whereClause = {
            updatedAt: {
                gte: today,
                lt: tomorrow,
            },
            statut: {
                not: porte_dto_1.StatutPorte.NON_VISITE,
            },
        };
        if (immeubleId) {
            await this.ensureImmeubleAccess(immeubleId, userId, userRole);
            whereClause.immeubleId = immeubleId;
        }
        else if (userRole === 'admin') {
        }
        else {
            const accessibleImmeubles = await this.prisma.immeuble.findMany({
                where: this.buildImmeubleAccessFilter(userId, userRole),
                select: { id: true },
            });
            if (!accessibleImmeubles.length) {
                return [];
            }
            whereClause.immeubleId = {
                in: accessibleImmeubles.map((i) => i.id),
            };
        }
        return this.prisma.porte.findMany({
            where: whereClause,
            include: {
                immeuble: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }
    async findRdvToday(userId, userRole) {
        const filter = this.buildImmeubleAccessFilter(userId, userRole);
        let immeubleIds;
        if (userRole !== 'admin') {
            const accessibleImmeubles = await this.prisma.immeuble.findMany({
                where: filter,
                select: { id: true },
            });
            if (!accessibleImmeubles.length) {
                return [];
            }
            immeubleIds = accessibleImmeubles.map((i) => i.id);
        }
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        return this.prisma.porte.findMany({
            where: {
                statut: porte_dto_1.StatutPorte.RENDEZ_VOUS_PRIS,
                rdvDate: {
                    gte: new Date(todayStr),
                    lt: new Date(new Date(todayStr).getTime() + 24 * 60 * 60 * 1000),
                },
                ...(immeubleIds && { immeubleId: { in: immeubleIds } }),
            },
            include: {
                immeuble: {
                    include: {
                        zone: true,
                    },
                },
            },
            orderBy: {
                rdvTime: 'asc',
            },
        });
    }
    async getStatusHistoriqueByPorte(porteId) {
        return this.prisma.statusHistorique.findMany({
            where: { porteId },
            include: {
                commercial: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                    },
                },
                manager: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getStatusHistoriqueByImmeuble(immeubleId) {
        return this.prisma.statusHistorique.findMany({
            where: {
                porte: {
                    immeubleId,
                },
            },
            include: {
                porte: {
                    select: {
                        id: true,
                        numero: true,
                        etage: true,
                    },
                },
                commercial: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                    },
                },
                manager: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.PorteService = PorteService;
exports.PorteService = PorteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        statistic_sync_service_1.StatisticSyncService])
], PorteService);
//# sourceMappingURL=porte.service.js.map