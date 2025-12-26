import { PrismaService } from '../prisma.service';
import { CreateImmeubleInput, UpdateImmeubleInput } from './immeuble.dto';
export declare class ImmeubleService {
    private prisma;
    constructor(prisma: PrismaService);
    private ensureImmeubleAccess;
    create(data: CreateImmeubleInput): Promise<{
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
    }>;
    findAll(userId?: number, userRole?: string): Promise<({
        portes: {
            id: number;
            statut: import("@prisma/client").$Enums.StatutPorte;
        }[];
    } & {
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
    })[]>;
    findOne(id: number, userId: number, userRole: string): Promise<({
        portes: {
            updatedAt: Date;
            id: number;
            numero: string;
            etage: number;
            statut: import("@prisma/client").$Enums.StatutPorte;
            nbRepassages: number;
            rdvDate: Date | null;
            rdvTime: string | null;
            commentaire: string | null;
            derniereVisite: Date | null;
        }[];
    } & {
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
    }) | null>;
    update(data: UpdateImmeubleInput, userId: number, userRole: string): Promise<{
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
    }>;
    remove(id: number, userId: number, userRole: string): Promise<{
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
    }>;
    addPorteToEtage(immeubleId: number, etage: number, userId: number, userRole: string): Promise<{
        manager: {
            id: number;
            directeurId: number | null;
        } | null;
        zone: {
            id: number;
            directeurId: number | null;
            managerId: number | null;
        } | null;
        commercial: {
            id: number;
            directeurId: number | null;
            managerId: number | null;
        } | null;
    } & {
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
    }>;
    removePorteFromEtage(immeubleId: number, etage: number, userId: number, userRole: string): Promise<{
        manager: {
            id: number;
            directeurId: number | null;
        } | null;
        zone: {
            id: number;
            directeurId: number | null;
            managerId: number | null;
        } | null;
        commercial: {
            id: number;
            directeurId: number | null;
            managerId: number | null;
        } | null;
    } & {
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
    }>;
    addEtage(immeubleId: number, userId: number, userRole: string): Promise<{
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
    }>;
    removeEtage(immeubleId: number, userId: number, userRole: string): Promise<{
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
    }>;
}
