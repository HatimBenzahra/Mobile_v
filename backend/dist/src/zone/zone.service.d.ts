import { PrismaService } from '../prisma.service';
import { CreateZoneInput, UpdateZoneInput, UserType } from './zone.dto';
export declare class ZoneService {
    private prisma;
    constructor(prisma: PrismaService);
    private calculateUserStatsForZone;
    private getCommercialsUnderManager;
    private getTeamUnderDirector;
    private assignSingleUserToZone;
    assignZoneToUser(zoneId: number, userId: number, userType: UserType, requestUserId?: number, requestUserRole?: string): Promise<any>;
    create(data: CreateZoneInput): Promise<{
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        xOrigin: number;
        yOrigin: number;
        rayon: number;
        managerId: number | null;
    }>;
    findAll(userId?: number, userRole?: string): Promise<({
        immeubles: {
            adresse: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            managerId: number | null;
            latitude: number | null;
            longitude: number | null;
            nbEtages: number;
            nbPortesParEtage: number;
            ascenseurPresent: boolean;
            digitalCode: string | null;
            commercialId: number | null;
            zoneId: number | null;
        }[];
    } & {
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        xOrigin: number;
        yOrigin: number;
        rayon: number;
        managerId: number | null;
    })[]>;
    findOne(id: number, userId: number, userRole: string): Promise<({
        immeubles: {
            adresse: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            managerId: number | null;
            latitude: number | null;
            longitude: number | null;
            nbEtages: number;
            nbPortesParEtage: number;
            ascenseurPresent: boolean;
            digitalCode: string | null;
            commercialId: number | null;
            zoneId: number | null;
        }[];
    } & {
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        xOrigin: number;
        yOrigin: number;
        rayon: number;
        managerId: number | null;
    }) | null>;
    assignToCommercial(zoneId: number, commercialId: number, userId: number, userRole: string): Promise<any>;
    assignToDirecteur(zoneId: number, directeurId: number, userId: number, userRole: string): Promise<any>;
    assignToManager(zoneId: number, managerId: number, userId: number, userRole: string): Promise<any>;
    private validateZoneAssignmentAuth;
    unassignUser(userId: number, userType: UserType, requestUserId: number, requestUserRole: string): Promise<{
        success: boolean;
        message: string;
    }>;
    unassignFromCommercial(zoneId: number, commercialId: number, requestUserId: number, requestUserRole: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getCurrentAssignment(userId: number, userType: UserType, requestUserId: number, requestUserRole: string): Promise<({
        zone: {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        };
    } & {
        id: number;
        zoneId: number;
        userId: number;
        userType: import("@prisma/client").$Enums.UserType;
        assignedAt: Date;
    }) | null>;
    getUserZoneHistory(userId: number, userType: UserType, requestUserId: number, requestUserRole: string): Promise<({
        zone: {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        };
    } & {
        id: number;
        zoneId: number;
        userId: number;
        totalContratsSignes: number;
        totalImmeublesVisites: number;
        totalRendezVousPris: number;
        totalRefus: number;
        totalImmeublesProspectes: number;
        totalPortesProspectes: number;
        userType: import("@prisma/client").$Enums.UserType;
        assignedAt: Date;
        unassignedAt: Date;
    })[]>;
    getZoneHistory(zoneId: number): Promise<{
        id: number;
        zoneId: number;
        userId: number;
        totalContratsSignes: number;
        totalImmeublesVisites: number;
        totalRendezVousPris: number;
        totalRefus: number;
        totalImmeublesProspectes: number;
        totalPortesProspectes: number;
        userType: import("@prisma/client").$Enums.UserType;
        assignedAt: Date;
        unassignedAt: Date;
    }[]>;
    getZoneCurrentAssignments(zoneId: number, userId: number, userRole: string): Promise<({
        zone: {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        };
    } & {
        id: number;
        zoneId: number;
        userId: number;
        userType: import("@prisma/client").$Enums.UserType;
        assignedAt: Date;
    })[]>;
    getAllZoneHistory(userId?: number, userRole?: string): Promise<({
        zone: {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        };
    } & {
        id: number;
        zoneId: number;
        userId: number;
        totalContratsSignes: number;
        totalImmeublesVisites: number;
        totalRendezVousPris: number;
        totalRefus: number;
        totalImmeublesProspectes: number;
        totalPortesProspectes: number;
        userType: import("@prisma/client").$Enums.UserType;
        assignedAt: Date;
        unassignedAt: Date;
    })[]>;
    getAllCurrentAssignments(userId?: number, userRole?: string): Promise<({
        zone: {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        };
    } & {
        id: number;
        zoneId: number;
        userId: number;
        userType: import("@prisma/client").$Enums.UserType;
        assignedAt: Date;
    })[]>;
    update(data: UpdateZoneInput): Promise<{
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        xOrigin: number;
        yOrigin: number;
        rayon: number;
        managerId: number | null;
    }>;
    remove(id: number): Promise<{
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        xOrigin: number;
        yOrigin: number;
        rayon: number;
        managerId: number | null;
    }>;
}
