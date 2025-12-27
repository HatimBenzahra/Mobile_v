export declare enum StatutPorte {
    NON_VISITE = "NON_VISITE",
    CONTRAT_SIGNE = "CONTRAT_SIGNE",
    REFUS = "REFUS",
    RENDEZ_VOUS_PRIS = "RENDEZ_VOUS_PRIS",
    ABSENT = "ABSENT",
    ARGUMENTE = "ARGUMENTE",
    NECESSITE_REPASSAGE = "NECESSITE_REPASSAGE"
}
export interface StatusMetadata {
    value: StatutPorte;
    description: string;
    countAsProspected: boolean;
    incrementContratsSignes: boolean;
    incrementRendezVousPris: boolean;
    incrementRefus: boolean;
    requiresRdvDateTime: boolean;
}
export declare const STATUS_CONFIG: Record<StatutPorte, StatusMetadata>;
export declare function getStatusConfig(status: StatutPorte): StatusMetadata;
export declare function getAllStatuses(): StatutPorte[];
export declare function getProspectedStatuses(): StatutPorte[];
export declare function isProspectedStatus(status: StatutPorte): boolean;
export declare function requiresRdvDateTime(status: StatutPorte): boolean;
export interface StatusStats {
    contratsSignes: number;
    rendezVousPris: number;
    refus: number;
    absents: number;
    argumentes: number;
    nbPortesProspectes: number;
}
export declare function calculateStatsForStatus(status: StatutPorte | string, count: number): StatusStats;
