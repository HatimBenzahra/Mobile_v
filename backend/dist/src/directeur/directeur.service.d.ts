import { PrismaService } from '../prisma.service';
import { CreateDirecteurInput, UpdateDirecteurInput } from './directeur.dto';
export declare class DirecteurService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateDirecteurInput): Promise<{
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
    findAll(userId?: number, userRole?: string): Promise<({
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
            absents: number;
            argumentes: number;
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
    findOne(id: number, userId: number, userRole: string): Promise<({
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
            absents: number;
            argumentes: number;
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
    update(data: UpdateDirecteurInput, userId: number, userRole: string): Promise<{
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
    remove(id: number, userId: number, userRole: string): Promise<{
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
