import { PrismaService } from '../prisma.service';
import { CreateStatisticInput, UpdateStatisticInput, ZoneStatistic } from './statistic.dto';
export declare class StatisticService {
    private prisma;
    constructor(prisma: PrismaService);
    private assertStatisticAccess;
    private ensureImmeubleAccess;
    create(data: CreateStatisticInput): Promise<{
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
        commercial: {
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
        } | null;
    } & {
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
    }>;
    findAll(commercialId?: number, userId?: number, userRole?: string): Promise<({
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
        commercial: {
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
        } | null;
    } & {
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
    })[]>;
    findOne(id: number, userId: number, userRole: string): Promise<({
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
        commercial: {
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
        } | null;
    } & {
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
    }) | null>;
    update(data: UpdateStatisticInput, userId: number, userRole: string): Promise<{
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
        commercial: {
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
        } | null;
    } & {
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
    }>;
    remove(id: number, userId: number, userRole: string): Promise<{
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
        commercial: {
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
        } | null;
    } & {
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
    }>;
    getZoneStatistics(userId?: number, userRole?: string): Promise<ZoneStatistic[]>;
    ensureCanSyncCommercialStats(immeubleId: number, userId: number, userRole: string): Promise<void>;
    ensureCanSyncManagerStats(managerId: number, userId: number, userRole: string): Promise<void>;
}
