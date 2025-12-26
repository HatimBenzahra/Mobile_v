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
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const axios_1 = __importDefault(require("axios"));
const prisma_service_1 = require("../../prisma.service");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard {
    prisma;
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL;
    REALM = process.env.KEYCLOAK_REALM;
    CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
    CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const gqlContext = graphql_1.GqlExecutionContext.create(context);
        const ctx = gqlContext.getContext();
        const request = ctx.req;
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Token manquant');
        }
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new common_1.UnauthorizedException('Token invalide');
        }
        try {
            const decodedToken = await this.validateTokenWithKeycloak(token);
            const groups = this.extractGroups(decodedToken);
            const role = this.mapGroupToRole(groups);
            const email = decodedToken.email || decodedToken.preferred_username;
            const userRecord = await this.resolveUserRecord(email, role);
            if (!userRecord) {
                throw new common_1.UnauthorizedException('User not provisioned');
            }
            request.user = {
                sub: decodedToken.sub,
                email,
                groups,
                role,
                id: userRecord.id,
                userId: userRecord.id,
            };
            this.logger.debug(`✅ Utilisateur authentifié: ${request.user.email} (${request.user.role})`);
            return true;
        }
        catch (error) {
            this.logger.error('❌ Erreur validation token:', error.message);
            throw new common_1.UnauthorizedException('Token invalide ou expiré');
        }
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
                throw new common_1.UnauthorizedException('Token expiré');
            }
            return response.data;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Impossible de valider le token');
        }
    }
    extractGroups(decodedToken) {
        return (decodedToken.groups ||
            decodedToken.realm_access?.roles ||
            decodedToken.resource_access?.[this.CLIENT_ID]?.roles ||
            []);
    }
    mapGroupToRole(groups) {
        const groupToRoleMap = {
            'Prospection-Admin': 'admin',
            'Prospection-Directeur': 'directeur',
            'Prospection-Manager': 'manager',
            'Prospection-Commercial': 'commercial',
        };
        for (const group of groups) {
            if (groupToRoleMap[group]) {
                return groupToRoleMap[group];
            }
        }
        throw new common_1.UnauthorizedException('Aucun rôle autorisé');
    }
    async resolveUserRecord(email, role) {
        if (!email) {
            this.logger.warn('JWT payload missing email, cannot resolve user record');
            return null;
        }
        switch (role) {
            case 'commercial':
                return this.prisma.commercial.findUnique({
                    where: { email },
                    select: { id: true },
                });
            case 'manager':
                return this.prisma.manager.findUnique({
                    where: { email },
                    select: { id: true },
                });
            case 'admin':
                this.logger.debug(`Admin authentifié: ${email}`);
                return { id: 0 };
            case 'directeur':
                return this.prisma.directeur.findUnique({
                    where: { email },
                    select: { id: true },
                });
            default:
                return null;
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map