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
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    }>;
    findByImmeuble(immeubleId: number, user: any): Promise<{
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
        rdvDate: Date | null;
        rdvTime: string | null;
        commentaire: string | null;
        derniereVisite: Date | null;
    })[]>;
}
