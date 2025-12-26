import { gql } from '@apollo/client';
import { apolloClient } from '../api';
import { storage } from './auth.storage';
import { UserRole } from '../../types';
import { ErrorMessages, parseGraphQLError } from '../../constants/errors';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  role: string;
  userId: number;
  email: string;
  groups: string[];
}

interface LoginData {
  login: AuthResponse;
}

interface RefreshTokenData {
  refreshToken: AuthResponse;
}

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      refresh_token
      expires_in
      role
      userId
      email
      groups
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      access_token
      refresh_token
      expires_in
      role
      userId
      email
      groups
    }
  }
`;

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResult> {
    try {
      console.log('🌐 Apollo mutation vers le backend...');

      const { data } = await apolloClient.mutate<LoginData>({
        mutation: LOGIN_MUTATION,
        variables: {
          loginInput: { username: email, password },
        },
      });

      console.log('📨 Réponse reçue:', data);

      if (!data) throw new Error('No data returned');

      const authData = data.login;

      await storage.setTokens(authData.access_token, authData.refresh_token);

      const user: AuthUser = {
        id: authData.userId,
        email: authData.email,
        role: authData.role as UserRole,
      };
      await storage.setUser(user);

      return { success: true, user };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '';

      if (message.includes('UNAUTHORIZED_GROUP')) {
        return {
          success: false,
          error: ErrorMessages.AUTH.UNAUTHORIZED,
        };
      }

      if (message.includes('Unauthorized') || message.includes('Invalid')) {
        return {
          success: false,
          error: ErrorMessages.AUTH.INVALID_CREDENTIALS,
        };
      }

      return { success: false, error: parseGraphQLError(error) };
    }
  },

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await storage.getRefreshToken();
      if (!refreshToken) return false;

      const { data } = await apolloClient.mutate<RefreshTokenData>({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { refreshToken },
      });

      if (!data) return false;

      const authData = data.refreshToken;
      await storage.setTokens(authData.access_token, authData.refresh_token);

      return true;
    } catch {
      return false;
    }
  },

  async logout(): Promise<void> {
    await storage.clear();
    await apolloClient.clearStore();
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    return storage.getUser();
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await storage.getAccessToken();
    return !!token;
  },
};
