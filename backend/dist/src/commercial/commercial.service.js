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
exports.CommercialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const zone_dto_1 = require("../zone/zone.dto");
let CommercialService = class CommercialService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ensureAccess(commercialId, userId, userRole) {
        const commercial = await this.prisma.commercial.findUnique({
            where: { id: commercialId },
            select: {
                id: true,
                managerId: true,
                directeurId: true,
            },
        });
        if (!commercial) {
            throw new common_1.NotFoundException('Commercial not found');
        }
        if (userRole === 'admin') {
            return commercial;
        }
        if (userRole === 'directeur' && commercial.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager' && commercial.managerId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'commercial' && commercial.id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return commercial;
    }
    async create(data) {
        let directeurId = data.directeurId;
        if (data.managerId && !directeurId) {
            const manager = await this.prisma.manager.findUnique({
                where: { id: data.managerId },
                select: { directeurId: true },
            });
            if (manager?.directeurId) {
                directeurId = manager.directeurId;
            }
        }
        return this.prisma.commercial.create({
            data: {
                ...data,
                directeurId,
            },
            include: {
                manager: true,
                directeur: true,
            },
        });
    }
    async findAll(userId, userRole) {
        if (userId === undefined || !userRole) {
            throw new common_1.ForbiddenException('UNAUTHORIZED');
        }
        switch (userRole) {
            case 'admin':
                return this.prisma.commercial.findMany({
                    include: {
                        manager: true,
                        directeur: true,
                        immeubles: true,
                        statistics: true,
                    },
                });
            case 'directeur':
                return this.prisma.commercial.findMany({
                    where: {
                        directeurId: userId,
                    },
                    include: {
                        manager: true,
                        directeur: true,
                        immeubles: true,
                        statistics: true,
                    },
                });
            case 'manager':
                return this.prisma.commercial.findMany({
                    where: {
                        managerId: userId,
                    },
                    include: {
                        manager: true,
                        directeur: true,
                        immeubles: true,
                        statistics: true,
                    },
                });
            case 'commercial':
                return this.prisma.commercial.findMany({
                    where: {
                        id: userId,
                    },
                    include: {
                        manager: true,
                        directeur: true,
                        immeubles: true,
                        statistics: true,
                    },
                });
            default:
                return [];
        }
    }
    async findOne(id, userId, userRole) {
        await this.ensureAccess(id, userId, userRole);
        return this.prisma.commercial.findUnique({
            where: { id },
            include: {
                manager: true,
                directeur: true,
                immeubles: {
                    include: {
                        portes: true,
                    },
                },
                statistics: true,
            },
        });
    }
    async update(data, userId, userRole) {
        const { id, ...updateData } = data;
        await this.ensureAccess(id, userId, userRole);
        let directeurId = updateData.directeurId;
        if (updateData.managerId !== undefined &&
            updateData.managerId !== null &&
            !directeurId) {
            const manager = await this.prisma.manager.findUnique({
                where: { id: updateData.managerId },
                select: { directeurId: true },
            });
            if (manager?.directeurId) {
                directeurId = manager.directeurId;
            }
        }
        return this.prisma.commercial.update({
            where: { id },
            data: {
                ...updateData,
                ...(directeurId !== undefined && { directeurId }),
            },
            include: {
                manager: true,
                directeur: true,
            },
        });
    }
    async remove(id, userId, userRole) {
        await this.ensureAccess(id, userId, userRole);
        return this.prisma.commercial.delete({
            where: { id },
            include: {
                manager: true,
                directeur: true,
            },
        });
    }
    async getCurrentZone(commercialId) {
        const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
            where: {
                userId_userType: {
                    userId: commercialId,
                    userType: zone_dto_1.UserType.COMMERCIAL,
                },
            },
            include: {
                zone: true,
            },
        });
        return zoneEnCours?.zone || null;
    }
    async getTeamRanking(commercialId, userId, userRole) {
        const commercial = await this.ensureAccess(commercialId, userId, userRole);
        if (!commercial.managerId) {
            return {
                position: 1,
                total: 1,
                points: 0,
                trend: null,
                managerNom: null,
                managerPrenom: null,
                managerEmail: null,
                managerNumTel: null,
            };
        }
        const manager = await this.prisma.manager.findUnique({
            where: { id: commercial.managerId },
            select: {
                nom: true,
                prenom: true,
                email: true,
                numTelephone: true,
            },
        });
        const teamCommercials = await this.prisma.commercial.findMany({
            where: {
                managerId: commercial.managerId,
            },
            include: {
                statistics: true,
            },
        });
        if (teamCommercials.length === 0) {
            return {
                position: 1,
                total: 1,
                points: 0,
                trend: null,
                managerNom: manager?.nom || null,
                managerPrenom: manager?.prenom || null,
                managerEmail: manager?.email || null,
                managerNumTel: manager?.numTelephone || null,
            };
        }
        const calculatePoints = (stats) => {
            const totals = stats.reduce((acc, stat) => ({
                contratsSignes: acc.contratsSignes + (stat.contratsSignes || 0),
                rendezVousPris: acc.rendezVousPris + (stat.rendezVousPris || 0),
                immeublesVisites: acc.immeublesVisites + (stat.immeublesVisites || 0),
            }), { contratsSignes: 0, rendezVousPris: 0, immeublesVisites: 0 });
            return (totals.contratsSignes * 50 +
                totals.rendezVousPris * 10 +
                totals.immeublesVisites * 5);
        };
        const teamWithPoints = teamCommercials.map((c) => ({
            id: c.id,
            points: calculatePoints(c.statistics || []),
        }));
        teamWithPoints.sort((a, b) => b.points - a.points);
        const currentIndex = teamWithPoints.findIndex((c) => c.id === commercialId);
        const currentPosition = currentIndex + 1;
        const currentPoints = teamWithPoints[currentIndex]?.points || 0;
        const medianIndex = Math.floor(teamWithPoints.length / 2);
        const medianPosition = medianIndex + 1;
        const medianPoints = teamWithPoints[medianIndex]?.points || 0;
        let trend = null;
        if (currentPosition < medianPosition) {
            trend = 'up';
        }
        else if (currentPosition > medianPosition) {
            trend = 'down';
        }
        else if (currentPoints > medianPoints) {
            trend = 'up';
        }
        else if (currentPoints < medianPoints) {
            trend = 'down';
        }
        return {
            position: currentPosition,
            total: teamWithPoints.length,
            points: currentPoints,
            trend,
            managerNom: manager?.nom || null,
            managerPrenom: manager?.prenom || null,
            managerEmail: manager?.email || null,
            managerNumTel: manager?.numTelephone || null,
        };
    }
};
exports.CommercialService = CommercialService;
exports.CommercialService = CommercialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommercialService);
//# sourceMappingURL=commercial.service.js.map