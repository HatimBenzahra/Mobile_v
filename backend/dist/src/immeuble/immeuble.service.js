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
exports.ImmeubleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ImmeubleService = class ImmeubleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
            return immeuble;
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
        return immeuble;
    }
    async create(data) {
        let zoneId = data.zoneId;
        if (!zoneId && data.commercialId) {
            const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
                where: {
                    userId_userType: {
                        userId: data.commercialId,
                        userType: 'COMMERCIAL',
                    },
                },
            });
            if (zoneEnCours) {
                zoneId = zoneEnCours.zoneId;
            }
        }
        if (!zoneId && data.managerId) {
            const zoneEnCours = await this.prisma.zoneEnCours.findUnique({
                where: {
                    userId_userType: {
                        userId: data.managerId,
                        userType: 'MANAGER',
                    },
                },
            });
            if (zoneEnCours) {
                zoneId = zoneEnCours.zoneId;
            }
        }
        const immeuble = await this.prisma.immeuble.create({
            data: {
                adresse: data.adresse,
                latitude: data.latitude,
                longitude: data.longitude,
                nbEtages: data.nbEtages,
                nbPortesParEtage: data.nbPortesParEtage,
                ascenseurPresent: data.ascenseurPresent,
                digitalCode: data.digitalCode,
                commercialId: data.commercialId,
                managerId: data.managerId,
                zoneId,
            },
        });
        const portes = [];
        for (let etage = 1; etage <= data.nbEtages; etage++) {
            for (let porte = 1; porte <= data.nbPortesParEtage; porte++) {
                portes.push({
                    numero: `${etage}${porte.toString().padStart(2, '0')}`,
                    etage,
                    immeubleId: immeuble.id,
                    statut: 'NON_VISITE',
                    nbRepassages: 0,
                });
            }
        }
        if (portes.length > 0) {
            await this.prisma.porte.createMany({
                data: portes,
            });
        }
        return immeuble;
    }
    async findAll(userId, userRole) {
        if (userId === undefined || !userRole) {
            throw new common_1.ForbiddenException('UNAUTHORIZED');
        }
        const immeubleInclude = {
            include: {
                portes: {
                    select: {
                        id: true,
                        statut: true,
                    },
                },
            },
        };
        switch (userRole) {
            case 'admin':
                return this.prisma.immeuble.findMany(immeubleInclude);
            case 'directeur':
                return this.prisma.immeuble.findMany({
                    where: {
                        commercial: {
                            directeurId: userId,
                        },
                    },
                    ...immeubleInclude,
                });
            case 'manager':
                return this.prisma.immeuble.findMany({
                    where: {
                        OR: [
                            {
                                commercial: {
                                    managerId: userId,
                                },
                            },
                            {
                                managerId: userId,
                            },
                        ],
                    },
                    ...immeubleInclude,
                });
            case 'commercial':
                return this.prisma.immeuble.findMany({
                    where: {
                        commercialId: userId,
                    },
                    ...immeubleInclude,
                });
            default:
                return [];
        }
    }
    async findOne(id, userId, userRole) {
        await this.ensureImmeubleAccess(id, userId, userRole);
        return this.prisma.immeuble.findUnique({
            where: { id },
            include: {
                portes: {
                    select: {
                        id: true,
                        statut: true,
                        etage: true,
                        numero: true,
                        nbRepassages: true,
                        rdvDate: true,
                        rdvTime: true,
                        commentaire: true,
                        derniereVisite: true,
                        updatedAt: true,
                    },
                },
            },
        });
    }
    async update(data, userId, userRole) {
        const { id, ...updateData } = data;
        await this.ensureImmeubleAccess(id, userId, userRole);
        return this.prisma.immeuble.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id, userId, userRole) {
        await this.ensureImmeubleAccess(id, userId, userRole);
        return this.prisma.immeuble.delete({
            where: { id },
        });
    }
    async addPorteToEtage(immeubleId, etage, userId, userRole) {
        const immeuble = await this.ensureImmeubleAccess(immeubleId, userId, userRole);
        if (etage < 1 || etage > immeuble.nbEtages) {
            throw new Error('Invalid floor number');
        }
        const portesEtage = await this.prisma.porte.findMany({
            where: {
                immeubleId,
                etage,
            },
            orderBy: {
                numero: 'desc',
            },
            take: 1,
        });
        let nouveauNumeroPorte = 1;
        if (portesEtage.length > 0) {
            const dernierNumero = portesEtage[0].numero;
            const numeroPorte = parseInt(dernierNumero.substring(1));
            nouveauNumeroPorte = numeroPorte + 1;
        }
        else {
            nouveauNumeroPorte = immeuble.nbPortesParEtage + 1;
        }
        await this.prisma.porte.create({
            data: {
                numero: `${etage}${nouveauNumeroPorte.toString().padStart(2, '0')}`,
                etage,
                immeubleId,
                statut: 'NON_VISITE',
                nbRepassages: 0,
            },
        });
        return immeuble;
    }
    async removePorteFromEtage(immeubleId, etage, userId, userRole) {
        const immeuble = await this.ensureImmeubleAccess(immeubleId, userId, userRole);
        if (etage < 1 || etage > immeuble.nbEtages) {
            throw new Error('Invalid floor number');
        }
        const portesEtage = await this.prisma.porte.findMany({
            where: {
                immeubleId,
                etage,
            },
            orderBy: {
                numero: 'desc',
            },
            take: 1,
        });
        if (portesEtage.length === 0) {
            throw new Error('No doors found on this floor');
        }
        const totalPortesEtage = await this.prisma.porte.count({
            where: {
                immeubleId,
                etage,
            },
        });
        if (totalPortesEtage <= 1) {
            throw new Error('Cannot remove the last door from this floor');
        }
        await this.prisma.porte.delete({
            where: {
                id: portesEtage[0].id,
            },
        });
        return immeuble;
    }
    async addEtage(immeubleId, userId, userRole) {
        const immeuble = await this.ensureImmeubleAccess(immeubleId, userId, userRole);
        const nouvelEtage = immeuble.nbEtages + 1;
        const updatedImmeuble = await this.prisma.immeuble.update({
            where: { id: immeubleId },
            data: {
                nbEtages: nouvelEtage,
            },
        });
        const nouvellesPortes = [];
        for (let porte = 1; porte <= immeuble.nbPortesParEtage; porte++) {
            nouvellesPortes.push({
                numero: `${nouvelEtage}${porte.toString().padStart(2, '0')}`,
                etage: nouvelEtage,
                immeubleId,
                statut: 'NON_VISITE',
                nbRepassages: 0,
            });
        }
        if (nouvellesPortes.length > 0) {
            await this.prisma.porte.createMany({
                data: nouvellesPortes,
            });
        }
        return updatedImmeuble;
    }
    async removeEtage(immeubleId, userId, userRole) {
        const immeuble = await this.ensureImmeubleAccess(immeubleId, userId, userRole);
        if (immeuble.nbEtages <= 1) {
            throw new Error('Cannot remove the last floor');
        }
        const etageASupprimer = immeuble.nbEtages;
        await this.prisma.porte.deleteMany({
            where: {
                immeubleId,
                etage: etageASupprimer,
            },
        });
        return this.prisma.immeuble.update({
            where: { id: immeubleId },
            data: {
                nbEtages: immeuble.nbEtages - 1,
            },
        });
    }
};
exports.ImmeubleService = ImmeubleService;
exports.ImmeubleService = ImmeubleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImmeubleService);
//# sourceMappingURL=immeuble.service.js.map