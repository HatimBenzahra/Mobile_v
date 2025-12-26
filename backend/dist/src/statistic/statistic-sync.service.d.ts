import { PrismaService } from '../prisma.service';
export declare class StatisticSyncService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    syncCommercialStats(immeubleId: number): Promise<void>;
    syncManagerStats(managerId: number): Promise<void>;
    syncDirecteurStats(directeurId: number): Promise<void>;
    private calculateRealStats;
    private calculateManagerRealStats;
    private calculateDirecteurRealStats;
    private upsertStatistic;
    private upsertManagerStatistic;
    private upsertDirecteurStatistic;
    recalculateAllStats(): Promise<{
        updated: number;
        errors: number;
    }>;
    validateStatsCoherence(): Promise<{
        valid: number;
        invalid: any[];
    }>;
}
