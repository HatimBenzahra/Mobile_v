import { DirecteurService } from './directeur.service';
import { CreateDirecteurInput, UpdateDirecteurInput } from './directeur.dto';
export declare class DirecteurResolver {
    private readonly directeurService;
    constructor(directeurService: DirecteurService);
    createDirecteur(createDirecteurInput: CreateDirecteurInput): Promise<{
        managers: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        }[];
        commercials: {
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
        }[];
    } & {
        nom: string;
        prenom: string;
        adresse: string | null;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(user: any): Promise<({
        managers: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        }[];
        commercials: {
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
        }[];
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
            nbImmeublesProspectes: number;
            nbPortesProspectes: number;
        }[];
    } & {
        nom: string;
        prenom: string;
        adresse: string | null;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number, user: any): Promise<({
        managers: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        }[];
        commercials: {
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
        }[];
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
            nbImmeublesProspectes: number;
            nbPortesProspectes: number;
        }[];
    } & {
        nom: string;
        prenom: string;
        adresse: string | null;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }) | null>;
    updateDirecteur(updateDirecteurInput: UpdateDirecteurInput, user: any): Promise<{
        managers: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        }[];
        commercials: {
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
        }[];
    } & {
        nom: string;
        prenom: string;
        adresse: string | null;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    removeDirecteur(id: number, user: any): Promise<{
        managers: {
            nom: string;
            prenom: string;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
        }[];
        commercials: {
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
        }[];
    } & {
        nom: string;
        prenom: string;
        adresse: string | null;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
