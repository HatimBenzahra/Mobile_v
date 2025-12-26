import { PrismaService } from '../prisma.service';
import { CreatePorteInput, UpdatePorteInput } from './porte.dto';
import { StatisticSyncService } from '../statistic/statistic-sync.service';
export declare class PorteService {
    private prisma;
    private statisticSyncService;
    constructor(prisma: PrismaService, statisticSyncService: StatisticSyncService);
    private validateImmeubleOwnership;
    private ensureImmeubleAccess;
    private ensurePorteAccess;
    private buildImmeubleAccessFilter;
    create(createPorteInput: CreatePorteInput): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    findAll(): Promise<({
        immeuble: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
    findOne(id: number, userId: number, userRole: string): Promise<{
        immeuble: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    findByImmeuble(immeubleId: number, userId: number, userRole: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }[]>;
    update(updatePorteInput: UpdatePorteInput, userId: number, userRole: string): Promise<{
        immeuble: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    remove(id: number, userId: number, userRole: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    createPortesForImmeuble(immeubleId: number, nbEtages: number, nbPortesParEtage: number, userId: number, userRole: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getStatistiquesPortes(immeubleId?: number): Promise<{
        totalPortes: number;
        contratsSigne: number;
        rdvPris: number;
        curieux: number;
        refus: number;
        nonVisitees: number;
        necessiteRepassage: number;
        portesVisitees: number;
        tauxConversion: string;
    }>;
    findModifiedToday(immeubleId?: number, userId?: number, userRole?: string): Promise<({
        immeuble: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
    findRdvToday(userId: number, userRole: string): Promise<({
        immeuble: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        immeubleId: number;
        numero: string;
        nomPersonnalise: string | null;
        etage: number;
        statut: import("@prisma/client").$Enums.StatutPorte;
        nbRepassages: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
}
