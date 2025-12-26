import { LiveKitConnectionDetails } from './audio-monitoring.dto';
type Role = 'publisher' | 'subscriber';
export declare class LiveKitService {
    private readonly logger;
    private readonly host;
    private readonly apiKey;
    private readonly apiSecret;
    private readonly rsc;
    generateConnectionDetails(roomName: string, identity: string, role: Role): Promise<LiveKitConnectionDetails>;
    createOrJoinRoom(roomName: string): Promise<void>;
    disconnectParticipant(roomName: string, identity: string): Promise<void>;
    listRoomsWithParticipants(): Promise<{
        roomName: string;
        createdAt: Date;
        participants: string[];
    }[]>;
}
export {};
