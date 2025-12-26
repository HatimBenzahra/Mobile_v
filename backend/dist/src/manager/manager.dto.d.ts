import { Directeur } from '../directeur/directeur.dto';
import { Commercial } from '../commercial/commercial.dto';
import { Zone } from '../zone/zone.dto';
import { Immeuble } from '../immeuble/immeuble.dto';
import { Statistic } from '../statistic/statistic.dto';
export declare class Manager {
    id: number;
    nom: string;
    prenom: string;
    email?: string;
    numTelephone?: string;
    directeurId?: number;
    createdAt: Date;
    updatedAt: Date;
    directeur?: Directeur | null;
    commercials?: Commercial[];
    zones?: Zone[];
    immeubles?: Immeuble[];
    statistics?: Statistic[];
    personalStatistics?: Statistic[];
    teamStatistics?: Statistic[];
}
export declare class CreateManagerInput {
    nom: string;
    prenom: string;
    email: string;
    numTelephone?: string;
    directeurId?: number;
}
export declare class UpdateManagerInput {
    id: number;
    nom?: string;
    prenom?: string;
    email?: string;
    numTelephone?: string;
    directeurId?: number;
}
