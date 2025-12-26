import { Immeuble } from '../immeuble/immeuble.dto';
export declare enum UserType {
    COMMERCIAL = "COMMERCIAL",
    MANAGER = "MANAGER",
    DIRECTEUR = "DIRECTEUR"
}
export declare class Zone {
    id: number;
    nom: string;
    xOrigin: number;
    yOrigin: number;
    rayon: number;
    directeurId?: number | null;
    managerId?: number | null;
    immeubles?: Immeuble[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateZoneInput {
    nom: string;
    xOrigin: number;
    yOrigin: number;
    rayon: number;
    directeurId?: number;
    managerId?: number;
}
export declare class UpdateZoneInput {
    id: number;
    nom?: string;
    xOrigin?: number;
    yOrigin?: number;
    rayon?: number;
    directeurId?: number;
    managerId?: number;
}
export declare class ZoneEnCours {
    id: number;
    zoneId: number;
    userId: number;
    userType: UserType;
    assignedAt: Date;
    zone?: Zone;
}
export declare class HistoriqueZone {
    id: number;
    zoneId: number;
    userId: number;
    userType: UserType;
    assignedAt: Date;
    unassignedAt: Date;
    totalContratsSignes: number;
    totalImmeublesVisites: number;
    totalRendezVousPris: number;
    totalRefus: number;
    totalImmeublesProspectes: number;
    totalPortesProspectes: number;
    zone?: Zone;
}
export declare class AssignZoneInput {
    zoneId: number;
    userId: number;
    userType: UserType;
}
