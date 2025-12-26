// ========== USER TYPES ==========

export type UserRole = 'commercial' | 'manager';

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
}

// ========== AUTH TYPES ==========

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

// ========== NAVIGATION TYPES ==========

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};
