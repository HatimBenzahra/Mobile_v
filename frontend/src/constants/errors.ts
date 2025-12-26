// ========== MESSAGES D'ERREUR CENTRALISÉS ==========

export const ErrorMessages = {
  // Authentification
  AUTH: {
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect',
    SESSION_EXPIRED: 'Votre session a expiré, veuillez vous reconnecter',
    UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource',
    TOKEN_INVALID: 'Token invalide, veuillez vous reconnecter',
    ACCOUNT_LOCKED: 'Compte verrouillé, contactez l\'administrateur',
    ACCOUNT_DISABLED: 'Compte désactivé',
  },

  // Formulaires
  FORM: {
    REQUIRED_FIELDS: 'Veuillez remplir tous les champs',
    INVALID_EMAIL: 'Adresse email invalide',
    PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères',
    PASSWORDS_MISMATCH: 'Les mots de passe ne correspondent pas',
  },

  // Réseau / Connexion
  NETWORK: {
    NO_CONNECTION: 'Pas de connexion internet',
    SERVER_UNREACHABLE: 'Impossible de joindre le serveur',
    TIMEOUT: 'La requête a expiré, veuillez réessayer',
    REQUEST_FAILED: 'La requête a échoué',
  },

  // Serveur
  SERVER: {
    INTERNAL_ERROR: 'Erreur serveur, veuillez réessayer plus tard',
    SERVICE_UNAVAILABLE: 'Service temporairement indisponible',
    MAINTENANCE: 'Le service est en maintenance',
  },

  // Données / Stats
  DATA: {
    LOAD_FAILED: 'Impossible de charger les données',
    SAVE_FAILED: 'Impossible de sauvegarder les données',
    NOT_FOUND: 'Données introuvables',
    SYNC_FAILED: 'Échec de la synchronisation',
  },

  // Générique
  GENERIC: {
    UNKNOWN: 'Une erreur est survenue',
    TRY_AGAIN: 'Veuillez réessayer',
    CONTACT_SUPPORT: 'Contactez le support si le problème persiste',
  },
} as const;

// Helper pour obtenir un message d'erreur à partir d'un code HTTP
export function getErrorMessageFromStatus(status: number): string {
  switch (status) {
    case 400:
      return ErrorMessages.GENERIC.UNKNOWN;
    case 401:
      return ErrorMessages.AUTH.UNAUTHORIZED;
    case 403:
      return ErrorMessages.AUTH.UNAUTHORIZED;
    case 404:
      return ErrorMessages.DATA.NOT_FOUND;
    case 408:
      return ErrorMessages.NETWORK.TIMEOUT;
    case 500:
      return ErrorMessages.SERVER.INTERNAL_ERROR;
    case 503:
      return ErrorMessages.SERVER.SERVICE_UNAVAILABLE;
    default:
      return ErrorMessages.GENERIC.UNKNOWN;
  }
}

// Helper pour parser les erreurs GraphQL/Apollo
export function parseGraphQLError(error: unknown): string {
  if (!error) return ErrorMessages.GENERIC.UNKNOWN;

  // Erreur réseau
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('network') || message.includes('fetch')) {
      return ErrorMessages.NETWORK.SERVER_UNREACHABLE;
    }
    if (message.includes('timeout')) {
      return ErrorMessages.NETWORK.TIMEOUT;
    }
    if (message.includes('unauthorized') || message.includes('401')) {
      return ErrorMessages.AUTH.INVALID_CREDENTIALS;
    }
  }

  // Erreur GraphQL avec extensions
  if (typeof error === 'object' && error !== null) {
    const gqlError = error as { graphQLErrors?: Array<{ message?: string }> };
    if (gqlError.graphQLErrors?.[0]?.message) {
      const msg = gqlError.graphQLErrors[0].message.toLowerCase();
      if (msg.includes('invalid') || msg.includes('credentials')) {
        return ErrorMessages.AUTH.INVALID_CREDENTIALS;
      }
    }
  }

  return ErrorMessages.GENERIC.UNKNOWN;
}
