import { ZoneService } from './zone.service';
import { CreateZoneInput, UpdateZoneInput, AssignZoneInput, UserType } from './zone.dto';
export declare class ZoneResolver {
    private readonly zoneService;
    constructor(zoneService: ZoneService);
    createZone(createZoneInput: CreateZoneInput): Promise<{
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
    findAll(user: any): Promise<({
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
    findOne(id: number, user: any): Promise<({
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
    updateZone(updateZoneInput: UpdateZoneInput): Promise<{
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
    removeZone(id: number): Promise<{
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
    assignZoneToCommercial(zoneId: number, commercialId: number, user: any): Promise<boolean>;
    assignZoneToDirecteur(zoneId: number, directeurId: number, user: any): Promise<boolean>;
    assignZoneToManager(zoneId: number, managerId: number, user: any): Promise<boolean>;
    unassignZoneFromCommercial(zoneId: number, commercialId: number, user: any): Promise<boolean>;
    assignZoneToUser(input: AssignZoneInput, user: any): Promise<any>;
    unassignUser(userId: number, userType: UserType, user: any): Promise<boolean>;
    getCurrentAssignment(userId: number, userType: UserType, user: any): Promise<({
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
    getUserZoneHistory(userId: number, userType: UserType, user: any): Promise<({
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
    getZoneCurrentAssignments(zoneId: number, user: any): Promise<({
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
    getAllZoneHistory(user: any): Promise<({
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
    getAllCurrentAssignments(user: any): Promise<({
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
}
