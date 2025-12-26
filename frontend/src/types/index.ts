// ========== USER TYPES ==========

export type UserRole = 'commercial' | 'manager';

export const ROLE_LABELS: Record<UserRole, string> = {
  commercial: 'Espace Commercial',
  manager: 'Espace Manager',
};

export interface User {
  id: number;
  email: string;
  role: UserRole;
}

// ========== NAVIGATION TYPES ==========

export type RootStackParamList = {
  Login: undefined;
  Main: { utilisateur: User };
};

export type TabParamList = {
  TableauDeBord: undefined;
  Immeubles: undefined;
  Historique: undefined;
  Profil: undefined;
};
