import { PorteService } from './porte.service';
import { CreatePorteInput, UpdatePorteInput } from './porte.dto';
export declare class PorteResolver {
    private readonly porteService;
    constructor(porteService: PorteService);
    createPorte(createPorteInput: CreatePorteInput): Promise<{
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
        nbContrats: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
    findOne(id: number, user: any): Promise<{
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
        nbContrats: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    findByImmeuble(immeubleId: number, skip: number, take: number, etage: number, user: any): Promise<{
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
    }[]>;
    getStatistics(immeubleId: number): Promise<{
        totalPortes: number;
        contratsSigne: number;
        rdvPris: number;
        absent: number;
        argumente: number;
        refus: number;
        nonVisitees: number;
        necessiteRepassage: number;
        portesVisitees: number;
        tauxConversion: string;
        portesParEtage: {
            etage: number;
            count: number;
        }[];
    }>;
    updatePorte(updatePorteInput: UpdatePorteInput, user: any): Promise<{
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
        nbContrats: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    removePorte(id: number, user: any): Promise<{
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
    }>;
    createPortesForImmeuble(immeubleId: number, nbEtages: number, nbPortesParEtage: number, user: any): Promise<boolean>;
    findModifiedToday(immeubleId?: number, user?: any): Promise<({
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
        nbContrats: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
    findRdvToday(user: any): Promise<({
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
        nbContrats: number;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
    getStatusHistoriqueByPorte(porteId: number): Promise<({
        manager: {
            nom: string;
            prenom: string;
            id: number;
        } | null;
        commercial: {
            nom: string;
            prenom: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        id: number;
        managerId: number | null;
        commercialId: number | null;
        statut: import("@prisma/client").$Enums.StatutPorte;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        porteId: number;
    })[]>;
    getStatusHistoriqueByImmeuble(immeubleId: number): Promise<({
        manager: {
            nom: string;
            prenom: string;
            id: number;
        } | null;
        commercial: {
            nom: string;
            prenom: string;
            id: number;
        } | null;
        porte: {
            id: number;
            numero: string;
            etage: number;
        };
    } & {
        createdAt: Date;
        id: number;
        managerId: number | null;
        commercialId: number | null;
        statut: import("@prisma/client").$Enums.StatutPorte;
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        porteId: number;
    })[]>;
}
