import { ImmeubleService } from './immeuble.service';
import { CreateImmeubleInput, UpdateImmeubleInput } from './immeuble.dto';
export declare class ImmeubleResolver {
    private readonly immeubleService;
    constructor(immeubleService: ImmeubleService);
    createImmeuble(createImmeubleInput: CreateImmeubleInput): Promise<{
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
    findAll(user: any): Promise<({
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
    findOne(id: number, user: any): Promise<({
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
    updateImmeuble(updateImmeubleInput: UpdateImmeubleInput, user: any): Promise<{
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
    removeImmeuble(id: number, user: any): Promise<{
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
    addPorteToEtage(immeubleId: number, etage: number, user: any): Promise<{
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
    removePorteFromEtage(immeubleId: number, etage: number, user: any): Promise<{
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
    addEtageToImmeuble(id: number, user: any): Promise<{
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
    removeEtageFromImmeuble(id: number, user: any): Promise<{
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
