import { Statistic } from '../statistic/statistic.dto';
export declare class Directeur {
    id: number;
    nom: string;
    prenom: string;
    adresse?: string;
    email: string;
    numTelephone?: string;
    createdAt: Date;
    updatedAt: Date;
    statistics?: Statistic[];
}
export declare class CreateDirecteurInput {
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    numTelephone: string;
}
export declare class UpdateDirecteurInput {
    id: number;
    nom?: string;
    prenom?: string;
    adresse?: string;
    email?: string;
    numTelephone?: string;
}
