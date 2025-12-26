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
exports.ZoneService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const zone_dto_1 = require("./zone.dto");
let ZoneService = class ZoneService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculateUserStatsForZone(userId, userType, zoneId, startDate, endDate) {
        let portesWhere = {
            immeuble: {
                zoneId: zoneId,
            },
            updatedAt: {
                gte: startDate,
                lte: endDate,
            },
        };
        switch (userType) {
            case zone_dto_1.UserType.COMMERCIAL:
                portesWhere.immeuble.commercialId = userId;
                break;
            case zone_dto_1.UserType.MANAGER:
                portesWhere.immeuble.OR = [
                    { managerId: userId },
                    {
                        commercial: {
                            managerId: userId,
                        },
                    },
                ];
                break;
            case zone_dto_1.UserType.DIRECTEUR:
                portesWhere.immeuble.OR = [
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
        }
        const portesGrouped = await this.prisma.porte.groupBy({
            by: ['statut'],
            where: portesWhere,
            _count: {
                statut: true,
            },
        });
        const immeublesVisites = await this.prisma.immeuble.count({
            where: {
                zoneId: zoneId,
                ...(userType === zone_dto_1.UserType.COMMERCIAL
                    ? { commercialId: userId }
                    : userType === zone_dto_1.UserType.MANAGER
                        ? {
                            OR: [
                                { managerId: userId },
                                { commercial: { managerId: userId } },
                            ],
                        }
                        : {
                            OR: [
                                { commercial: { directeurId: userId } },
                                { manager: { directeurId: userId } },
                            ],
                        }),
                updatedAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        const stats = {
            totalContratsSignes: 0,
            totalImmeublesVisites: immeublesVisites,
            totalRendezVousPris: 0,
            totalRefus: 0,
            totalImmeublesProspectes: immeublesVisites,
            totalPortesProspectes: 0,
        };
        portesGrouped.forEach((group) => {
            const count = group._count.statut;
            switch (group.statut) {
                case 'CONTRAT_SIGNE':
                    stats.totalContratsSignes += count;
                    stats.totalPortesProspectes += count;
                    break;
                case 'RENDEZ_VOUS_PRIS':
                    stats.totalRendezVousPris += count;
                    stats.totalPortesProspectes += count;
                    break;
                case 'REFUS':
                    stats.totalRefus += count;
                    stats.totalPortesProspectes += count;
                    break;
                case 'CURIEUX':
                case 'NECESSITE_REPASSAGE':
                    stats.totalPortesProspectes += count;
                    break;
            }
        });
        return stats;
    }
    async getCommercialsUnderManager(managerId, tx) {
        const prisma = tx || this.prisma;
        const commercials = await prisma.commercial.findMany({
            where: { managerId },
            select: { id: true },
        });
        return commercials.map((c) => c.id);
    }
    async getTeamUnderDirector(directeurId, tx) {
        const prisma = tx || this.prisma;
        const managers = await prisma.manager.findMany({
            where: { directeurId },
            select: { id: true },
        });
        const managerIds = managers.map((m) => m.id);
        const directCommercials = await prisma.commercial.findMany({
            where: { directeurId },
            select: { id: true },
        });
        const managersCommercials = await prisma.commercial.findMany({
            where: { managerId: { in: managerIds } },
            select: { id: true },
        });
        const allCommercialIds = new Set([
            ...directCommercials.map((c) => c.id),
            ...managersCommercials.map((c) => c.id),
        ]);
        return {
            managers: managerIds,
            commercials: Array.from(allCommercialIds),
        };
    }
    async assignSingleUserToZone(zoneId, userId, userType, tx) {
        const currentAssignment = await tx.zoneEnCours.findUnique({
            where: {
                userId_userType: {
                    userId,
                    userType,
                },
            },
        });
        if (currentAssignment) {
            const stats = await this.calculateUserStatsForZone(userId, userType, currentAssignment.zoneId, currentAssignment.assignedAt, new Date());
            await tx.historiqueZone.create({
                data: {
                    zoneId: currentAssignment.zoneId,
                    userId,
                    userType,
                    assignedAt: currentAssignment.assignedAt,
                    unassignedAt: new Date(),
                    ...stats,
                },
            });
            await tx.zoneEnCours.delete({
                where: { id: currentAssignment.id },
            });
        }
        const newAssignment = await tx.zoneEnCours.create({
            data: {
                zoneId,
                userId,
                userType,
            },
            include: {
                zone: true,
            },
        });
        return newAssignment;
    }
    async assignZoneToUser(zoneId, userId, userType, requestUserId, requestUserRole) {
        return this.prisma.$transaction(async (tx) => {
            const zone = await tx.zone.findUnique({ where: { id: zoneId } });
            if (!zone) {
                throw new common_1.NotFoundException('Zone not found');
            }
            if (requestUserId && requestUserRole && requestUserRole !== 'admin') {
                if (requestUserRole === 'directeur' &&
                    zone.directeurId !== requestUserId) {
                    throw new common_1.ForbiddenException('Can only assign zones you own');
                }
                if (requestUserRole === 'manager' && zone.managerId !== requestUserId) {
                    throw new common_1.ForbiddenException('Can only assign zones you own');
                }
            }
            const mainAssignment = await this.assignSingleUserToZone(zoneId, userId, userType, tx);
            if (userType === zone_dto_1.UserType.MANAGER) {
                const commercialIds = await this.getCommercialsUnderManager(userId, tx);
                for (const commercialId of commercialIds) {
                    await this.assignSingleUserToZone(zoneId, commercialId, zone_dto_1.UserType.COMMERCIAL, tx);
                }
            }
            else if (userType === zone_dto_1.UserType.DIRECTEUR) {
                const team = await this.getTeamUnderDirector(userId, tx);
                for (const managerId of team.managers) {
                    await this.assignSingleUserToZone(zoneId, managerId, zone_dto_1.UserType.MANAGER, tx);
                }
                for (const commercialId of team.commercials) {
                    await this.assignSingleUserToZone(zoneId, commercialId, zone_dto_1.UserType.COMMERCIAL, tx);
                }
            }
            return mainAssignment;
        });
    }
    async create(data) {
        return this.prisma.zone.create({
            data,
        });
    }
    async findAll(userId, userRole) {
        if (userId === undefined || !userRole) {
            throw new common_1.ForbiddenException('UNAUTHORIZED');
        }
        switch (userRole) {
            case 'admin':
                return this.prisma.zone.findMany({
                    include: {
                        immeubles: true,
                    },
                });
            case 'directeur':
                return this.prisma.zone.findMany({
                    where: {
                        directeurId: userId,
                    },
                    include: {
                        immeubles: true,
                    },
                });
            case 'manager':
                return this.prisma.zone.findMany({
                    where: {
                        managerId: userId,
                    },
                    include: {
                        immeubles: true,
                    },
                });
            case 'commercial':
                const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
                    where: {
                        userId_userType: {
                            userId,
                            userType: zone_dto_1.UserType.COMMERCIAL,
                        },
                    },
                    select: {
                        zoneId: true,
                    },
                });
                if (!zoneEnCours) {
                    return [];
                }
                return this.prisma.zone.findMany({
                    where: {
                        id: zoneEnCours.zoneId,
                    },
                    include: {
                        immeubles: true,
                    },
                });
            default:
                return [];
        }
    }
    async findOne(id, userId, userRole) {
        if (userRole === 'admin') {
            return this.prisma.zone.findUnique({
                where: { id },
                include: {
                    immeubles: true,
                },
            });
        }
        const zone = await this.prisma.zone.findUnique({
            where: { id },
            include: {
                immeubles: true,
            },
        });
        if (!zone) {
            throw new common_1.NotFoundException('Zone not found');
        }
        if (userRole === 'directeur' && zone.directeurId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'manager' && zone.managerId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        if (userRole === 'commercial') {
            const assignment = await this.prisma.zoneEnCours.findUnique({
                where: {
                    userId_userType: {
                        userId,
                        userType: zone_dto_1.UserType.COMMERCIAL,
                    },
                    zoneId: id,
                },
            });
            if (!assignment) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        return zone;
    }
    async assignToCommercial(zoneId, commercialId, userId, userRole) {
        await this.validateZoneAssignmentAuth(zoneId, userId, userRole, 'manager');
        return this.assignZoneToUser(zoneId, commercialId, zone_dto_1.UserType.COMMERCIAL);
    }
    async assignToDirecteur(zoneId, directeurId, userId, userRole) {
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admin can assign zones to directeurs');
        }
        return this.assignZoneToUser(zoneId, directeurId, zone_dto_1.UserType.DIRECTEUR);
    }
    async assignToManager(zoneId, managerId, userId, userRole) {
        await this.validateZoneAssignmentAuth(zoneId, userId, userRole, 'directeur');
        return this.assignZoneToUser(zoneId, managerId, zone_dto_1.UserType.MANAGER);
    }
    async validateZoneAssignmentAuth(zoneId, userId, userRole, minRole) {
        if (userRole === 'admin')
            return;
        const zone = await this.prisma.zone.findUnique({ where: { id: zoneId } });
        if (!zone) {
            throw new common_1.NotFoundException('Zone not found');
        }
        if (minRole === 'directeur') {
            if (userRole !== 'admin' && userRole !== 'directeur') {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (userRole === 'directeur' && zone.directeurId !== userId) {
                throw new common_1.ForbiddenException('Can only assign zones you own');
            }
        }
        else if (minRole === 'manager') {
            if (!['admin', 'directeur', 'manager'].includes(userRole)) {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (userRole === 'directeur' && zone.directeurId !== userId) {
                throw new common_1.ForbiddenException('Can only assign zones you own');
            }
            if (userRole === 'manager' && zone.managerId !== userId) {
                throw new common_1.ForbiddenException('Can only assign zones you own');
            }
        }
    }
    async unassignUser(userId, userType, requestUserId, requestUserRole) {
        return this.prisma.$transaction(async (tx) => {
            const currentAssignment = await tx.zoneEnCours.findUnique({
                where: {
                    userId_userType: {
                        userId,
                        userType,
                    },
                },
            });
            if (!currentAssignment) {
                throw new common_1.NotFoundException('No active zone assignment found for this user');
            }
            if (requestUserRole !== 'admin') {
                const zone = await tx.zone.findUnique({
                    where: { id: currentAssignment.zoneId },
                });
                if (!zone) {
                    throw new common_1.NotFoundException('Zone not found');
                }
                if (requestUserRole === 'directeur' &&
                    zone.directeurId !== requestUserId) {
                    throw new common_1.ForbiddenException('Can only unassign from zones you own');
                }
                if (requestUserRole === 'manager' && zone.managerId !== requestUserId) {
                    throw new common_1.ForbiddenException('Can only unassign from zones you own');
                }
            }
            const stats = await this.calculateUserStatsForZone(userId, userType, currentAssignment.zoneId, currentAssignment.assignedAt, new Date());
            await tx.historiqueZone.create({
                data: {
                    zoneId: currentAssignment.zoneId,
                    userId,
                    userType,
                    assignedAt: currentAssignment.assignedAt,
                    unassignedAt: new Date(),
                    ...stats,
                },
            });
            await tx.zoneEnCours.delete({
                where: { id: currentAssignment.id },
            });
            return {
                success: true,
                message: 'User unassigned from zone successfully',
            };
        });
    }
    async unassignFromCommercial(zoneId, commercialId, requestUserId, requestUserRole) {
        return this.unassignUser(commercialId, zone_dto_1.UserType.COMMERCIAL, requestUserId, requestUserRole);
    }
    async getCurrentAssignment(userId, userType, requestUserId, requestUserRole) {
        if (requestUserRole !== 'admin') {
            if (requestUserRole === 'commercial' && userId !== requestUserId) {
                throw new common_1.ForbiddenException('Can only view your own assignment');
            }
            if (requestUserRole === 'manager' && userType === zone_dto_1.UserType.COMMERCIAL) {
                const commercial = await this.prisma.commercial.findUnique({
                    where: { id: userId },
                    select: { managerId: true },
                });
                if (commercial?.managerId !== requestUserId) {
                    throw new common_1.ForbiddenException('Can only view your commercials assignments');
                }
            }
            else if (requestUserRole === 'manager' && userId !== requestUserId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (requestUserRole === 'directeur') {
                if (userType === zone_dto_1.UserType.MANAGER) {
                    const manager = await this.prisma.manager.findUnique({
                        where: { id: userId },
                        select: { directeurId: true },
                    });
                    if (manager?.directeurId !== requestUserId) {
                        throw new common_1.ForbiddenException('Can only view your managers assignments');
                    }
                }
                else if (userType === zone_dto_1.UserType.COMMERCIAL) {
                    const commercial = await this.prisma.commercial.findUnique({
                        where: { id: userId },
                        select: { directeurId: true },
                    });
                    if (commercial?.directeurId !== requestUserId) {
                        throw new common_1.ForbiddenException('Can only view your commercials assignments');
                    }
                }
                else if (userId !== requestUserId) {
                    throw new common_1.ForbiddenException('Access denied');
                }
            }
        }
        return this.prisma.zoneEnCours.findUnique({
            where: {
                userId_userType: {
                    userId,
                    userType,
                },
            },
            include: {
                zone: true,
            },
        });
    }
    async getUserZoneHistory(userId, userType, requestUserId, requestUserRole) {
        if (requestUserRole !== 'admin') {
            if (requestUserRole === 'commercial' && userId !== requestUserId) {
                throw new common_1.ForbiddenException('Can only view your own history');
            }
            if (requestUserRole === 'manager' && userType === zone_dto_1.UserType.COMMERCIAL) {
                const commercial = await this.prisma.commercial.findUnique({
                    where: { id: userId },
                    select: { managerId: true },
                });
                if (commercial?.managerId !== requestUserId) {
                    throw new common_1.ForbiddenException('Can only view your commercials history');
                }
            }
            else if (requestUserRole === 'manager' && userId !== requestUserId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (requestUserRole === 'directeur') {
                if (userType === zone_dto_1.UserType.MANAGER) {
                    const manager = await this.prisma.manager.findUnique({
                        where: { id: userId },
                        select: { directeurId: true },
                    });
                    if (manager?.directeurId !== requestUserId) {
                        throw new common_1.ForbiddenException('Can only view your managers history');
                    }
                }
                else if (userType === zone_dto_1.UserType.COMMERCIAL) {
                    const commercial = await this.prisma.commercial.findUnique({
                        where: { id: userId },
                        select: { directeurId: true },
                    });
                    if (commercial?.directeurId !== requestUserId) {
                        throw new common_1.ForbiddenException('Can only view your commercials history');
                    }
                }
                else if (userId !== requestUserId) {
                    throw new common_1.ForbiddenException('Access denied');
                }
            }
        }
        return this.prisma.historiqueZone.findMany({
            where: {
                userId,
                userType,
            },
            include: {
                zone: true,
            },
            orderBy: {
                unassignedAt: 'desc',
            },
        });
    }
    async getZoneHistory(zoneId) {
        return this.prisma.historiqueZone.findMany({
            where: {
                zoneId,
            },
            orderBy: {
                unassignedAt: 'desc',
            },
        });
    }
    async getZoneCurrentAssignments(zoneId, userId, userRole) {
        if (userRole !== 'admin') {
            const zone = await this.prisma.zone.findUnique({ where: { id: zoneId } });
            if (!zone) {
                throw new common_1.NotFoundException('Zone not found');
            }
            if (userRole === 'directeur' && zone.directeurId !== userId) {
                throw new common_1.ForbiddenException('Can only view assignments for your zones');
            }
            if (userRole === 'manager' && zone.managerId !== userId) {
                throw new common_1.ForbiddenException('Can only view assignments for your zones');
            }
        }
        return this.prisma.zoneEnCours.findMany({
            where: {
                zoneId,
            },
            include: {
                zone: true,
            },
        });
    }
    async getAllZoneHistory(userId, userRole) {
        if (userId === undefined || !userRole) {
            throw new common_1.ForbiddenException('UNAUTHORIZED');
        }
        switch (userRole) {
            case 'admin':
                return this.prisma.historiqueZone.findMany({
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        unassignedAt: 'desc',
                    },
                });
            case 'directeur':
                return this.prisma.historiqueZone.findMany({
                    where: {
                        zone: {
                            directeurId: userId,
                        },
                    },
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        unassignedAt: 'desc',
                    },
                });
            case 'manager':
                return this.prisma.historiqueZone.findMany({
                    where: {
                        zone: {
                            managerId: userId,
                        },
                    },
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        unassignedAt: 'desc',
                    },
                });
            case 'commercial':
                return this.prisma.historiqueZone.findMany({
                    where: {
                        userId: userId,
                        userType: zone_dto_1.UserType.COMMERCIAL,
                    },
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        unassignedAt: 'desc',
                    },
                });
            default:
                return [];
        }
    }
    async getAllCurrentAssignments(userId, userRole) {
        if (userId === undefined || !userRole) {
            throw new common_1.ForbiddenException('UNAUTHORIZED');
        }
        switch (userRole) {
            case 'admin':
                return this.prisma.zoneEnCours.findMany({
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        assignedAt: 'desc',
                    },
                });
            case 'directeur':
                return this.prisma.zoneEnCours.findMany({
                    where: {
                        zone: {
                            directeurId: userId,
                        },
                    },
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        assignedAt: 'desc',
                    },
                });
            case 'manager':
                return this.prisma.zoneEnCours.findMany({
                    where: {
                        zone: {
                            managerId: userId,
                        },
                    },
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        assignedAt: 'desc',
                    },
                });
            case 'commercial':
                return this.prisma.zoneEnCours.findMany({
                    where: {
                        userId: userId,
                        userType: zone_dto_1.UserType.COMMERCIAL,
                    },
                    include: {
                        zone: true,
                    },
                    orderBy: {
                        assignedAt: 'desc',
                    },
                });
            default:
                return [];
        }
    }
    async update(data) {
        const { id, ...updateData } = data;
        return this.prisma.zone.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        return this.prisma.$transaction(async (prisma) => {
            await prisma.statistic.deleteMany({
                where: { zoneId: id },
            });
            return prisma.zone.delete({
                where: { id },
            });
        });
    }
};
exports.ZoneService = ZoneService;
exports.ZoneService = ZoneService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ZoneService);
//# sourceMappingURL=zone.service.js.map