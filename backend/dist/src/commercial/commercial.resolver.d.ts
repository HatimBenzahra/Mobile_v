import { CommercialService } from './commercial.service';
import { CreateCommercialInput, UpdateCommercialInput } from './commercial.dto';
import { Zone } from '../zone/zone.dto';
import { Immeuble } from '../immeuble/immeuble.dto';
import { Statistic } from '../statistic/statistic.dto';
interface CommercialWithRelations {
    id: number;
    zones?: Array<{
        zone: Zone;
    }>;
    immeubles?: Immeuble[];
    statistics?: Statistic[];
}
export declare class CommercialResolver {
    private readonly commercialService;
    constructor(commercialService: CommercialService);
    createCommercial(createCommercialInput: CreateCommercialInput): Promise<{
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
    findAll(user: any): Promise<({
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
    findOne(id: number, user: any): Promise<({
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
    updateCommercial(updateCommercialInput: UpdateCommercialInput, user: any): Promise<{
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
    removeCommercial(id: number, user: any): Promise<{
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
    zones(commercial: CommercialWithRelations): Promise<Zone[]>;
    immeubles(commercial: CommercialWithRelations): Immeuble[];
    statistics(commercial: CommercialWithRelations): Statistic[];
    getTeamRanking(commercialId: number, user: any): Promise<{
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
export {};
