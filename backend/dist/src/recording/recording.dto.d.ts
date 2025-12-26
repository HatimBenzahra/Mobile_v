export declare class RecordingResult {
    egressId: string;
    roomName: string;
    status: string;
    s3Key: string;
    url?: string;
}
export declare class RecordingItem {
    key: string;
    url?: string;
    size?: number;
    lastModified?: Date;
}
export declare class EgressState {
    egressId: string;
    status: string;
    roomName?: string;
    error?: string;
}
export declare class StartRecordingInput {
    roomName: string;
    audioOnly?: boolean;
    participantIdentity?: string;
    immeubleId?: number;
}
export declare class StopRecordingInput {
    egressId: string;
}
