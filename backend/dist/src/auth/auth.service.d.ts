import { LoginInput } from './dto/login.input';
import { AuthResponse } from './auth.types';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly KEYCLOAK_BASE_URL;
    private readonly REALM;
    private readonly CLIENT_ID;
    private readonly CLIENT_SECRET;
    private readonly GROUP_TO_ROLE_MAP;
    private readonly ALLOWED_GROUPS;
    login(loginInput: LoginInput): Promise<AuthResponse>;
    refreshToken(refreshToken: string): Promise<AuthResponse>;
    private processAuthResponse;
    private validateTokenWithKeycloak;
    private extractGroups;
    private extractUserInfo;
    private findOrCreateUser;
}
