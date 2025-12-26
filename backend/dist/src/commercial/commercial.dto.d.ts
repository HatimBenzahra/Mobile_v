import { Immeuble } from '../immeuble/immeuble.dto';
import { Zone } from '../zone/zone.dto';
import { Statistic } from '../statistic/statistic.dto';
export declare class Commercial {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    numTel?: string;
    age?: number;
    managerId?: number;
    directeurId?: number;
    createdAt: Date;
    updatedAt: Date;
    immeubles: Immeuble[];
    zones: Zone[];
    statistics: Statistic[];
}
export declare class CreateCommercialInput {
    nom: string;
    prenom: string;
    email: string;
    numTel: string;
    age: number;
    managerId?: number;
    directeurId?: number;
}
export declare class UpdateCommercialInput {
    id: number;
    nom?: string;
    prenom?: string;
    email?: string;
    numTel?: string;
    age?: number;
    managerId?: number;
    directeurId?: number;
}
export declare class TeamRanking {
    position: number;
    total: number;
    points: number;
    trend?: string;
    managerNom?: string;
    managerPrenom?: string;
    managerEmail?: string;
    managerNumTel?: string;
}
