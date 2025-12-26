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
exports.DirecteurService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DirecteurService = class DirecteurService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.directeur.create({
            data,
            include: {
                managers: true,
                commercials: true,
            },
        });
    }
    async findAll(userId, userRole) {
        if (userId === undefined || !userRole) {
            return this.prisma.directeur.findMany({
                include: {
                    managers: true,
                    commercials: true,
                    statistics: true,
                },
            });
        }
        switch (userRole) {
            case 'admin':
                return this.prisma.directeur.findMany({
                    include: {
                        managers: true,
                        commercials: true,
                        statistics: true,
                    },
                });
            case 'directeur':
                return this.prisma.directeur.findMany({
                    where: {
                        id: userId,
                    },
                    include: {
                        managers: true,
                        commercials: true,
                        statistics: true,
                    },
                });
            case 'manager':
                return this.prisma.directeur.findMany({
                    where: {
                        managers: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                    include: {
                        managers: true,
                        commercials: true,
                        statistics: true,
                    },
                });
            default:
                return [];
        }
    }
    async findOne(id, userId, userRole) {
        if (userRole === 'admin') {
            return this.prisma.directeur.findUnique({
                where: { id },
                include: {
                    managers: true,
                    commercials: true,
                    statistics: true,
                },
            });
        }
        const directeur = await this.prisma.directeur.findUnique({
            where: { id },
            include: {
                managers: true,
                commercials: true,
                statistics: true,
            },
        });
        if (!directeur) {
            throw new common_1.NotFoundException('Directeur not found');
        }
        if (userRole === 'directeur' && directeur.id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return directeur;
    }
    async update(data, userId, userRole) {
        const { id, ...updateData } = data;
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admin can update directeurs');
        }
        const directeur = await this.prisma.directeur.findUnique({
            where: { id },
        });
        if (!directeur) {
            throw new common_1.NotFoundException('Directeur not found');
        }
        return this.prisma.directeur.update({
            where: { id },
            data: updateData,
            include: {
                managers: true,
                commercials: true,
            },
        });
    }
    async remove(id, userId, userRole) {
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admin can delete directeurs');
        }
        const directeur = await this.prisma.directeur.findUnique({
            where: { id },
        });
        if (!directeur) {
            throw new common_1.NotFoundException('Directeur not found');
        }
        return this.prisma.directeur.delete({
            where: { id },
            include: {
                managers: true,
                commercials: true,
            },
        });
    }
};
exports.DirecteurService = DirecteurService;
exports.DirecteurService = DirecteurService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DirecteurService);
//# sourceMappingURL=directeur.service.js.map