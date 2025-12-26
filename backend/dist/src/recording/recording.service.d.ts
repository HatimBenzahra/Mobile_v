import { RecordingResult, RecordingItem, EgressState, StartRecordingInput } from './recording.dto';
import { PrismaService } from '../prisma.service';
export declare class RecordingService {
    private prisma;
    private readonly logger;
    private readonly lkHost;
    private readonly lkApiKey;
    private readonly lkApiSecret;
    private readonly region;
    private readonly bucket;
    private readonly prefix;
    private readonly awsAccessKey;
    private readonly awsSecretKey;
    private readonly egress;
    private readonly s3;
    private safeRoom;
    private urlCache;
    constructor(prisma: PrismaService);
    private normalizeRoomName;
    private parseRoomIdentifier;
    private parseParticipantIdentity;
    private ensureRoomAccess;
    private extractRoomFromKey;
    private signedUrlOrUndefined;
    startRecording(input: StartRecordingInput, currentUser: {
        id: number;
        role: string;
    }): Promise<RecordingResult>;
    stopRecording(egressId: string, currentUser: {
        id: number;
        role: string;
    }): Promise<boolean>;
    listRecordings(roomName: string, currentUser: {
        id: number;
        role: string;
    }): Promise<RecordingItem[]>;
    egressState(egressId: string, currentUser: {
        id: number;
        role: string;
    }): Promise<EgressState>;
    getStreamingUrl(key: string, currentUser: {
        id: number;
        role: string;
    }): Promise<string>;
}
