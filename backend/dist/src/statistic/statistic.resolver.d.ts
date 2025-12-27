import { StatisticService } from './statistic.service';
import { StatisticSyncService } from './statistic-sync.service';
import { CreateStatisticInput, UpdateStatisticInput, ZoneStatistic } from './statistic.dto';
export declare class StatisticResolver {
    private readonly statisticService;
    private readonly statisticSyncService;
    constructor(statisticService: StatisticService, statisticSyncService: StatisticSyncService);
    createStatistic(createStatisticInput: CreateStatisticInput): Promise<{
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
        absents: number;
        argumentes: number;
        nbImmeublesProspectes: number;
        nbPortesProspectes: number;
    }>;
    findAll(commercialId: number | undefined, user: any): Promise<({
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
        absents: number;
        argumentes: number;
        nbImmeublesProspectes: number;
        nbPortesProspectes: number;
    })[]>;
    findOne(id: number, user: any): Promise<({
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
        absents: number;
        argumentes: number;
        nbImmeublesProspectes: number;
        nbPortesProspectes: number;
    }) | null>;
    updateStatistic(updateStatisticInput: UpdateStatisticInput, user: any): Promise<{
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
        absents: number;
        argumentes: number;
        nbImmeublesProspectes: number;
        nbPortesProspectes: number;
    }>;
    removeStatistic(id: number, user: any): Promise<{
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
        absents: number;
        argumentes: number;
        nbImmeublesProspectes: number;
        nbPortesProspectes: number;
    }>;
    getZoneStatistics(user: any): Promise<ZoneStatistic[]>;
    recalculateAllStats(): Promise<string>;
    validateStatsCoherence(): Promise<string>;
    syncCommercialStats(immeubleId: number, user: any): Promise<string>;
    syncManagerStats(managerId: number, user: any): Promise<string>;
}
