import { ManagerService } from './manager.service';
import { CreateManagerInput, UpdateManagerInput } from './manager.dto';
export declare class ManagerResolver {
    private readonly managerService;
    constructor(managerService: ManagerService);
    createManager(createManagerInput: CreateManagerInput): Promise<{
        commercials: {
            nom: string;
            prenom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            numTel: string | null;
            age: number | null;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    }>;
    findAll(user: any): Promise<({
        commercials: {
            nom: string;
            prenom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            numTel: string | null;
            age: number | null;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    })[]>;
    findOne(id: number, user: any): Promise<({
        commercials: {
            nom: string;
            prenom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            numTel: string | null;
            age: number | null;
        }[];
        zones: {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    }) | null>;
    findPersonal(id: number, user: any): Promise<{
        immeubles: ({
            portes: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                immeubleId: number;
                numero: string;
                nomPersonnalise: string | null;
                etage: number;
                statut: import("@prisma/client").$Enums.StatutPorte;
                nbRepassages: number;
                rdvDate: Date | null;
                rdvTime: string | null;
                commentaire: string | null;
                derniereVisite: Date | null;
            }[];
        } & {
            adresse: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            managerId: number | null;
            latitude: number | null;
            longitude: number | null;
            nbEtages: number;
            nbPortesParEtage: number;
            ascenseurPresent: boolean;
            digitalCode: string | null;
            commercialId: number | null;
            zoneId: number | null;
        })[];
        statistics: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            commercialId: number | null;
            zoneId: number | null;
            immeubleId: number | null;
            contratsSignes: number;
            immeublesVisites: number;
            rendezVousPris: number;
            refus: number;
            nbImmeublesProspectes: number;
            nbPortesProspectes: number;
        }[];
        zones: ({
            immeubles: {
                adresse: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                managerId: number | null;
                latitude: number | null;
                longitude: number | null;
                nbEtages: number;
                nbPortesParEtage: number;
                ascenseurPresent: boolean;
                digitalCode: string | null;
                commercialId: number | null;
                zoneId: number | null;
            }[];
        } & {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        })[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    } | null>;
    findFull(id: number, user: any): Promise<{
        immeubles: any[];
        statistics: any[];
        personalStatistics: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            commercialId: number | null;
            zoneId: number | null;
            immeubleId: number | null;
            contratsSignes: number;
            immeublesVisites: number;
            rendezVousPris: number;
            refus: number;
            nbImmeublesProspectes: number;
            nbPortesProspectes: number;
        }[];
        teamStatistics: any[];
        commercials: ({
            statistics: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                directeurId: number | null;
                managerId: number | null;
                commercialId: number | null;
                zoneId: number | null;
                immeubleId: number | null;
                contratsSignes: number;
                immeublesVisites: number;
                rendezVousPris: number;
                refus: number;
                nbImmeublesProspectes: number;
                nbPortesProspectes: number;
            }[];
            immeubles: ({
                portes: {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    immeubleId: number;
                    numero: string;
                    nomPersonnalise: string | null;
                    etage: number;
                    statut: import("@prisma/client").$Enums.StatutPorte;
                    nbRepassages: number;
                    rdvDate: Date | null;
                    rdvTime: string | null;
                    commentaire: string | null;
                    derniereVisite: Date | null;
                }[];
            } & {
                adresse: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                managerId: number | null;
                latitude: number | null;
                longitude: number | null;
                nbEtages: number;
                nbPortesParEtage: number;
                ascenseurPresent: boolean;
                digitalCode: string | null;
                commercialId: number | null;
                zoneId: number | null;
            })[];
        } & {
            nom: string;
            prenom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            numTel: string | null;
            age: number | null;
        })[];
        zones: ({
            statistics: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                directeurId: number | null;
                managerId: number | null;
                commercialId: number | null;
                zoneId: number | null;
                immeubleId: number | null;
                contratsSignes: number;
                immeublesVisites: number;
                rendezVousPris: number;
                refus: number;
                nbImmeublesProspectes: number;
                nbPortesProspectes: number;
            }[];
            immeubles: ({
                portes: {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    immeubleId: number;
                    numero: string;
                    nomPersonnalise: string | null;
                    etage: number;
                    statut: import("@prisma/client").$Enums.StatutPorte;
                    nbRepassages: number;
                    rdvDate: Date | null;
                    rdvTime: string | null;
                    commentaire: string | null;
                    derniereVisite: Date | null;
                }[];
            } & {
                adresse: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                managerId: number | null;
                latitude: number | null;
                longitude: number | null;
                nbEtages: number;
                nbPortesParEtage: number;
                ascenseurPresent: boolean;
                digitalCode: string | null;
                commercialId: number | null;
                zoneId: number | null;
            })[];
        } & {
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            xOrigin: number;
            yOrigin: number;
            rayon: number;
            managerId: number | null;
        })[];
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    } | null>;
    updateManager(updateManagerInput: UpdateManagerInput, user: any): Promise<{
        commercials: {
            nom: string;
            prenom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            numTel: string | null;
            age: number | null;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    }>;
    removeManager(id: number, user: any): Promise<{
        commercials: {
            nom: string;
            prenom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            directeurId: number | null;
            managerId: number | null;
            numTel: string | null;
            age: number | null;
        }[];
        directeur: {
            nom: string;
            prenom: string;
            adresse: string | null;
            email: string | null;
            numTelephone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
    } & {
        nom: string;
        prenom: string;
        email: string | null;
        numTelephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        directeurId: number | null;
    }>;
}
