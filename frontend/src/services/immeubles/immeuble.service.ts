import { gql } from '@apollo/client';
import { apolloClient } from '../api';

// --- ENUMS ---

export enum StatutPorte {
  NON_VISITE = 'NON_VISITE',
  CONTRAT_SIGNE = 'CONTRAT_SIGNE',
  REFUS = 'REFUS',
  RENDEZ_VOUS_PRIS = 'RENDEZ_VOUS_PRIS',
  ABSENT = 'ABSENT',
  ARGUMENTE = 'ARGUMENTE',
  NECESSITE_REPASSAGE = 'NECESSITE_REPASSAGE',
}

// --- QUERIES ---

const GET_IMMEUBLES = gql`
  query GetImmeubles {
    immeubles {
      id
      adresse
      latitude
      longitude
      nbEtages
      nbPortesParEtage
      ascenseurPresent
      digitalCode
      commercialId
      managerId
      zoneId
      createdAt
      updatedAt
    }
  }
`;

const GET_IMMEUBLE_BY_ID = gql`
  query GetImmeuble($id: Int!) {
    immeuble(id: $id) {
      id
      adresse
      latitude
      longitude
      nbEtages
      nbPortesParEtage
      ascenseurPresent
      digitalCode
      commercialId
      managerId
      zoneId
      portes {
        id
        statut
      }
      createdAt
      updatedAt
    }
  }
`;

// --- MUTATIONS ---

const CREATE_IMMEUBLE = gql`
  mutation CreateImmeuble($input: CreateImmeubleInput!) {
    createImmeuble(createImmeubleInput: $input) {
      id
      adresse
      latitude
      longitude
      nbEtages
      nbPortesParEtage
      ascenseurPresent
      digitalCode
      commercialId
      managerId
      zoneId
      portes {
        id
        statut
      }
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_IMMEUBLE = gql`
  mutation RemoveImmeuble($id: Int!) {
    removeImmeuble(id: $id) {
      id
    }
  }
`;

// --- INTERFACES ---

export interface Immeuble {
  id: number;
  adresse: string;
  latitude: number;
  longitude: number;
  nbEtages: number;
  nbPortesParEtage: number;
  ascenseurPresent: boolean;
  digitalCode: string;
  commercialId: number;
  managerId: number;
  zoneId: number;
  portes: Porte[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Porte {
  id: number;
  numero?: string;
  nomPersonnalise?: string;
  etage?: number;
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

export interface CreateImmeubleInput {
  adresse: string;
  latitude: number;
  longitude: number;
  nbEtages: number;
  nbPortesParEtage: number;
  ascenseurPresent: boolean;
  digitalCode: string;
  commercialId: number;
  managerId: number;
  zoneId: number;
}

// --- SERVICE ---

export const immeubleService = {
  /**
   * Récupérer la liste des immeubles
   */
  async getImmeubles(): Promise<Immeuble[]> {
    try {
      const { data } = await apolloClient.query<{ immeubles: Immeuble[] }>({
        query: GET_IMMEUBLES,
      });
      return data?.immeubles || [];
    } catch (error) {
      console.error('Erreur service getImmeubles:', error);
      throw error;
    }
  },

  /**
   * Créer un nouvel immeuble
   */
  async createImmeuble(input: CreateImmeubleInput): Promise<Immeuble> {
    try {
      const { data } = await apolloClient.mutate<{ createImmeuble: Immeuble }, { input: CreateImmeubleInput }>({
        mutation: CREATE_IMMEUBLE,
        variables: { input },
      });

      if (!data?.createImmeuble) {
         throw new Error('Erreur lors de la création de l\'immeuble');
      }

      return data.createImmeuble;
    } catch (error) {
      console.error('Erreur service createImmeuble:', error);
      throw error;
    }
  },

  /**
   * Supprimer un immeuble
   */
  async deleteImmeuble(id: number): Promise<boolean> {
    try {
      await apolloClient.mutate<{ removeImmeuble: { id: number } }, { id: number }>({
        mutation: REMOVE_IMMEUBLE,
        variables: { id },
      });
      return true;
    } catch (error) {
      console.error('Erreur service deleteImmeuble:', error);
      return false;
    }
  },
};