"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL;
    REALM = process.env.KEYCLOAK_REALM;
    CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
    CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
    GROUP_TO_ROLE_MAP = {
        'Prospection-Admin': 'admin',
        'Prospection-Directeur': 'directeur',
        'Prospection-Manager': 'manager',
        'Prospection-Commercial': 'commercial',
    };
    ALLOWED_GROUPS = [
        'Prospection-Admin',
        'Prospection-Directeur',
        'Prospection-Manager',
        'Prospection-Commercial',
    ];
    async login(loginInput) {
        const { username, password } = loginInput;
        const params = new URLSearchParams();
        params.append('client_id', this.CLIENT_ID);
        params.append('client_secret', this.CLIENT_SECRET);
        params.append('grant_type', 'password');
        params.append('username', username);
        params.append('password', password);
        try {
            const response = await axios_1.default.post(`${this.KEYCLOAK_BASE_URL}/realms/${this.REALM}/protocol/openid-connect/token`, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return this.processAuthResponse(response.data);
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            const message = error.response?.data?.error_description ||
                error.response?.data?.error ||
                'Login failed';
            common_1.Logger.error('AuthService', "❌ Erreur d'authentification Keycloak:", message);
            throw new common_1.UnauthorizedException(message);
        }
    }
    async refreshToken(refreshToken) {
        const params = new URLSearchParams();
        params.append('client_id', this.CLIENT_ID);
        params.append('client_secret', this.CLIENT_SECRET);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        try {
            const response = await axios_1.default.post(`${this.KEYCLOAK_BASE_URL}/realms/${this.REALM}/protocol/openid-connect/token`, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return this.processAuthResponse(response.data);
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            const message = error.response?.data?.error_description ||
                error.response?.data?.error ||
                'Token refresh failed';
            common_1.Logger.error('AuthService', '❌ Erreur refresh token Keycloak:', message);
            throw new common_1.UnauthorizedException(message);
        }
    }
    async processAuthResponse(tokenData) {
        const decodedToken = await this.validateTokenWithKeycloak(tokenData.access_token);
        common_1.Logger.debug('AuthService', '🔍 Token décodé complet:', JSON.stringify(decodedToken, null, 2));
        const groups = this.extractGroups(decodedToken);
        common_1.Logger.debug('AuthService', '📋 Groupes extraits:', groups);
        const authorizedGroup = groups.find((group) => this.ALLOWED_GROUPS.includes(group));
        if (!authorizedGroup) {
            common_1.Logger.error('AuthService', "❌ Aucun groupe autorisé trouvé. Groupes de l'utilisateur:", groups);
            throw new common_1.ForbiddenException('UNAUTHORIZED_GROUP');
        }
        const role = this.GROUP_TO_ROLE_MAP[authorizedGroup];
        common_1.Logger.debug('AuthService', 'Connexion réussie - Groupe:', authorizedGroup, '- Rôle:', role);
        if (role === 'admin') {
            const userInfo = this.extractUserInfo(decodedToken);
            common_1.Logger.debug('AuthService', '✅ Admin authentifié:', userInfo.email);
            return {
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                expires_in: tokenData.expires_in,
                token_type: tokenData.token_type,
                groups,
                role,
                userId: 0,
                email: userInfo.email,
            };
        }
        const userInfo = this.extractUserInfo(decodedToken);
        const userId = await this.findOrCreateUser(userInfo, role);
        common_1.Logger.debug('AuthService', '✅ Utilisateur synchronisé - ID:', userId, '- Email:', userInfo.email);
        return {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_in: tokenData.expires_in,
            token_type: tokenData.token_type,
            groups,
            role,
            userId,
            email: userInfo.email,
        };
    }
    async validateTokenWithKeycloak(token) {
        const params = new URLSearchParams();
        params.append('client_id', this.CLIENT_ID);
        params.append('client_secret', this.CLIENT_SECRET);
        params.append('token', token);
        try {
            const response = await axios_1.default.post(`${this.KEYCLOAK_BASE_URL}/realms/${this.REALM}/protocol/openid-connect/token/introspect`, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            if (!response.data.active) {
                throw new common_1.UnauthorizedException('Token invalide ou expiré');
            }
            return response.data;
        }
        catch (error) {
            common_1.Logger.error('AuthService', 'Erreur validation token Keycloak:', error);
            throw new common_1.UnauthorizedException('Impossible de valider le token');
        }
    }
    extractGroups(decodedToken) {
        const possiblePaths = [
            decodedToken['groups'],
            decodedToken['realm_access']?.['roles'],
            decodedToken['resource_access']?.[this.CLIENT_ID]?.['roles'],
        ];
        for (const groups of possiblePaths) {
            if (Array.isArray(groups) && groups.length > 0) {
                return groups;
            }
        }
        return [];
    }
    extractUserInfo(decodedToken) {
        const email = decodedToken.email || '';
        const name = decodedToken.name || decodedToken.given_name || '';
        const familyName = decodedToken.family_name || '';
        let nom = familyName;
        let prenom = name;
        if (!nom && !prenom && decodedToken.name) {
            const nameParts = decodedToken.name.split(' ');
            if (nameParts.length > 1) {
                prenom = nameParts[0];
                nom = nameParts.slice(1).join(' ');
            }
            else {
                prenom = decodedToken.name;
                nom = decodedToken.name;
            }
        }
        if (!nom) {
            common_1.Logger.error('AuthService', '❌ Nom vide');
        }
        if (!prenom) {
            common_1.Logger.error('AuthService', '❌ Prénom vide');
        }
        return {
            sub: decodedToken.sub,
            email,
            family_name: nom,
            name: prenom,
        };
    }
    async findOrCreateUser(userInfo, role) {
        const email = userInfo.email;
        const prenom = userInfo.name || 'PrenomVide';
        const nom = userInfo.family_name || 'nomVide';
        common_1.Logger.debug('AuthService', `🔍 Recherche de l'utilisateur: ${email} (${role})`);
        try {
            switch (role) {
                case 'commercial': {
                    let commercial = await this.prisma.commercial.findUnique({
                        where: { email },
                    });
                    if (!commercial) {
                        console.log(`📝 Création du commercial: ${prenom} ${nom}`);
                        commercial = await this.prisma.commercial.create({
                            data: {
                                email,
                                nom,
                                prenom,
                            },
                        });
                        common_1.Logger.debug('AuthService', `✅ Commercial créé avec ID: ${commercial.id}`);
                    }
                    else {
                        common_1.Logger.debug('AuthService', `✅ Commercial trouvé avec ID: ${commercial.id}`);
                    }
                    return commercial.id;
                }
                case 'manager': {
                    let manager = await this.prisma.manager.findUnique({
                        where: { email },
                    });
                    if (!manager) {
                        console.log(`📝 Création du manager: ${prenom} ${nom}`);
                        manager = await this.prisma.manager.create({
                            data: {
                                email,
                                nom,
                                prenom,
                            },
                        });
                        common_1.Logger.debug('AuthService', `✅ Manager créé avec ID: ${manager.id}`);
                    }
                    else {
                        common_1.Logger.debug('AuthService', `✅ Manager trouvé avec ID: ${manager.id}`);
                    }
                    return manager.id;
                }
                case 'directeur': {
                    let directeur = await this.prisma.directeur.findUnique({
                        where: { email },
                    });
                    if (!directeur) {
                        console.log(`📝 Création du directeur: ${prenom} ${nom}`);
                        directeur = await this.prisma.directeur.create({
                            data: {
                                email,
                                nom,
                                prenom,
                            },
                        });
                        common_1.Logger.debug('AuthService', `✅ Directeur créé avec ID: ${directeur.id}`);
                    }
                    else {
                        common_1.Logger.debug('AuthService', `✅ Directeur trouvé avec ID: ${directeur.id}`);
                    }
                    return directeur.id;
                }
                default:
                    throw new common_1.UnauthorizedException('Rôle non reconnu');
            }
        }
        catch (error) {
            common_1.Logger.debug('AuthService', '❌ Erreur lors de la création/recherche utilisateur:', error);
            throw new common_1.UnauthorizedException('Erreur de synchronisation utilisateur');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map