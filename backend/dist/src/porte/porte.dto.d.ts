export declare enum StatutPorte {
    NON_VISITE = "NON_VISITE",
    CONTRAT_SIGNE = "CONTRAT_SIGNE",
    REFUS = "REFUS",
    RENDEZ_VOUS_PRIS = "RENDEZ_VOUS_PRIS",
    CURIEUX = "CURIEUX",
    NECESSITE_REPASSAGE = "NECESSITE_REPASSAGE"
}
export declare class Porte {
    id: number;
    numero: string;
    nomPersonnalise?: string;
    etage: number;
    immeubleId: number;
    statut: StatutPorte;
    nbRepassages: number;
    rdvDate?: Date;
    rdvTime?: string;
    commentaire?: string;
    derniereVisite?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreatePorteInput {
    numero: string;
    nomPersonnalise?: string;
    etage: number;
    immeubleId: number;
    statut?: StatutPorte;
    nbRepassages?: number;
    rdvDate?: Date;
    rdvTime?: string;
    commentaire?: string;
    derniereVisite?: Date;
}
export declare class UpdatePorteInput {
    id: number;
    numero?: string;
    nomPersonnalise?: string;
    etage?: number;
    statut?: StatutPorte;
    nbRepassages?: number;
    rdvDate?: Date;
    rdvTime?: string;
    commentaire?: string;
    derniereVisite?: Date;
}
