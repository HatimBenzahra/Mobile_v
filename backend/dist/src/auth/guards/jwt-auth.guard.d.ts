import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly prisma;
    private readonly logger;
    private readonly KEYCLOAK_BASE_URL;
    private readonly REALM;
    private readonly CLIENT_ID;
    private readonly CLIENT_SECRET;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateTokenWithKeycloak;
    private extractGroups;
    private mapGroupToRole;
    private resolveUserRecord;
}
