import { Porte } from '../porte/porte.dto';
export declare class Immeuble {
    id: number;
    adresse: string;
    latitude?: number;
    longitude?: number;
    nbEtages: number;
    nbPortesParEtage: number;
    ascenseurPresent: boolean;
    digitalCode?: string;
    commercialId?: number;
    managerId?: number;
    zoneId?: number;
    portes?: Porte[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateImmeubleInput {
    adresse: string;
    latitude?: number;
    longitude?: number;
    nbEtages: number;
    nbPortesParEtage: number;
    ascenseurPresent: boolean;
    digitalCode?: string;
    commercialId?: number;
    managerId?: number;
    zoneId?: number;
}
export declare class UpdateImmeubleInput {
    id: number;
    adresse?: string;
    latitude?: number;
    longitude?: number;
    nbEtages?: number;
    nbPortesParEtage?: number;
    ascenseurPresent?: boolean;
    digitalCode?: string;
    commercialId?: number;
    managerId?: number;
    zoneId?: number;
}
