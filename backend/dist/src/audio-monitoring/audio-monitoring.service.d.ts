import { PrismaService } from '../prisma.service';
import { LiveKitService } from './livekit.service';
import { MonitoringSession, StartMonitoringInput, LiveKitConnectionDetails, ActiveRoom } from './audio-monitoring.dto';
export declare class AudioMonitoringService {
    private prisma;
    private liveKit;
    private readonly logger;
    private activeSessions;
    constructor(prisma: PrismaService, liveKit: LiveKitService);
    private roomNameFor;
    private normalizeUserType;
    private getTargetMeta;
    private getTargetFromRoomName;
    private canViewRoom;
    private ensureMonitoringPermission;
    private validateRoomName;
    startMonitoring(input: StartMonitoringInput, currentUser: {
        id: number;
        role: string;
    }): Promise<LiveKitConnectionDetails>;
    stopMonitoring(sessionId: string, currentUser: {
        id: number;
        role: string;
    }): Promise<boolean>;
    getActiveSessions(currentUser: {
        id: number;
        role: string;
    }): Promise<MonitoringSession[]>;
    private cleanupGhostSessions;
    getActiveRooms(currentUser: {
        id: number;
        role: string;
    }): Promise<ActiveRoom[]>;
    generateCommercialToken(requestedCommercialId: number | undefined, roomName: string | undefined, currentUser?: {
        id: number;
        role: string;
    }): Promise<LiveKitConnectionDetails>;
    generateManagerToken(requestedManagerId: number | undefined, roomName: string | undefined, currentUser?: {
        id: number;
        role: string;
    }): Promise<LiveKitConnectionDetails>;
    logAudioEvent(eventType: string, message: string, details: string | undefined, currentUser?: {
        id: number;
        role: string;
    }): Promise<boolean>;
}
