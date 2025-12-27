import { PrismaService } from '../prisma.service';
import { CreateCommercialInput, UpdateCommercialInput } from './commercial.dto';
export declare class CommercialService {
    private prisma;
    constructor(prisma: PrismaService);
    private ensureAccess;
    create(data: CreateCommercialInput): Promise<{
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        manager: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        managerId: number | null;
        numTel: string | null;
        age: number | null;
    }>;
    findAll(userId?: number, userRole?: string): Promise<({
        statistics: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            commercialId: number | null;
            zoneId: number | null;
            immeubleId: number | null;
            contratsSignes: number;
            immeublesVisites: number;
            rendezVousPris: number;
            refus: number;
            absents: number;
            argumentes: number;
            nbImmeublesProspectes: number;
            nbPortesProspectes: number;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
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
        manager: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        managerId: number | null;
        numTel: string | null;
        age: number | null;
    })[]>;
    findOne(id: number, userId: number, userRole: string): Promise<({
        statistics: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            commercialId: number | null;
            zoneId: number | null;
            immeubleId: number | null;
            contratsSignes: number;
            immeublesVisites: number;
            rendezVousPris: number;
            refus: number;
            absents: number;
            argumentes: number;
            nbImmeublesProspectes: number;
            nbPortesProspectes: number;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        immeubles: ({
            portes: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                immeubleId: number;
                numero: string;
                nomPersonnalise: string | null;
                etage: number;
                statut: import("@prisma/client").$Enums.StatutPorte;
                nbRepassages: number;
                nbContrats: number;
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
        })[];
        manager: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        managerId: number | null;
        numTel: string | null;
        age: number | null;
    }) | null>;
    update(data: UpdateCommercialInput, userId: number, userRole: string): Promise<{
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        manager: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        managerId: number | null;
        numTel: string | null;
        age: number | null;
    }>;
    remove(id: number, userId: number, userRole: string): Promise<{
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        manager: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        managerId: number | null;
        numTel: string | null;
        age: number | null;
    }>;
    getCurrentZone(commercialId: number): Promise<{
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
        xOrigin: number;
        yOrigin: number;
        rayon: number;
        managerId: number | null;
    } | null>;
    getTeamRanking(commercialId: number, userId: number, userRole: string): Promise<{
        position: number;
        total: number;
        points: number;
        trend: string | null;
        managerNom: string | null;
        managerPrenom: string | null;
        managerEmail: string | null;
        managerNumTel: string | null;
    }>;
}
