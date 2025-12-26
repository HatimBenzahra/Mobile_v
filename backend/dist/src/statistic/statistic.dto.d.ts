export declare class Statistic {
    id: number;
    commercialId?: number;
    managerId?: number;
    directeurId?: number;
    immeubleId?: number;
    zoneId?: number;
    contratsSignes: number;
    immeublesVisites: number;
    rendezVousPris: number;
    refus: number;
    nbImmeublesProspectes: number;
    nbPortesProspectes: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateStatisticInput {
    commercialId?: number;
    managerId?: number;
    directeurId?: number;
    immeubleId?: number;
    zoneId?: number;
    contratsSignes: number;
    immeublesVisites: number;
    rendezVousPris: number;
    refus: number;
    nbImmeublesProspectes: number;
    nbPortesProspectes: number;
}
declare const UpdateStatisticInput_base: import("@nestjs/common").Type<Partial<CreateStatisticInput>>;
export declare class UpdateStatisticInput extends UpdateStatisticInput_base {
    id: number;
}
export declare class ZoneStatistic {
    zoneId: number;
    zoneName: string;
    totalContratsSignes: number;
    totalImmeublesVisites: number;
    totalRendezVousPris: number;
    totalRefus: number;
    totalImmeublesProspectes: number;
    totalPortesProspectes: number;
    tauxConversion: number;
    tauxSuccesRdv: number;
    nombreCommerciaux: number;
    performanceGlobale: number;
}
export {};
