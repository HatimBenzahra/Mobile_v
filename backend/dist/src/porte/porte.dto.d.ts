import { StatutPorte } from './porte-status.constants';
export { StatutPorte } from './porte-status.constants';
export declare class Porte {
    id: number;
    numero: string;
    nomPersonnalise?: string;
    etage: number;
    immeubleId: number;
    statut: StatutPorte;
    nbRepassages: number;
    nbContrats: number;
    rdvDate?: Date;
    rdvTime?: string;
    commentaire?: string;
    derniereVisite?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class EtageInStatistics {
    etage: number;
    count: number;
}
export declare class PorteStatistics {
    totalPortes: number;
    contratsSigne: number;
    rdvPris: number;
    absent: number;
    argumente: number;
    refus: number;
    nonVisitees: number;
    necessiteRepassage: number;
    portesVisitees: number;
    tauxConversion: string;
    portesParEtage: EtageInStatistics[];
}
export declare class CreatePorteInput {
    numero: string;
    nomPersonnalise?: string;
    etage: number;
    immeubleId: number;
    statut?: StatutPorte;
    nbRepassages?: number;
    nbContrats?: number;
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
    nbContrats?: number;
    rdvDate?: Date;
    rdvTime?: string;
    commentaire?: string;
    derniereVisite?: Date;
}
export declare class CommercialInfo {
    id: number;
    nom: string;
    prenom: string;
}
export declare class ManagerInfo {
    id: number;
    nom: string;
    prenom: string;
}
export declare class PorteInfo {
    id: number;
    numero: string;
    etage: number;
}
export declare class StatusHistorique {
    id: number;
    porteId: number;
    commercialId?: number;
    managerId?: number;
    statut: StatutPorte;
    commentaire?: string;
    rdvDate?: Date;
    rdvTime?: string;
    createdAt: Date;
    porte?: PorteInfo;
    commercial?: CommercialInfo;
    manager?: ManagerInfo;
}
