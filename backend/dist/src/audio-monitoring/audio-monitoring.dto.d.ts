export declare enum MonitoringStatus {
    ACTIVE = "ACTIVE",
    STOPPED = "STOPPED",
    PAUSED = "PAUSED"
}
export declare class MonitoringSession {
    id: string;
    userId: number;
    userType: string;
    roomName: string;
    status: MonitoringStatus;
    startedAt: Date;
    endedAt?: Date;
    supervisorId: number;
    participantToken?: string;
}
export declare class LiveKitConnectionDetails {
    serverUrl: string;
    participantToken: string;
    roomName: string;
    participantName: string;
}
export declare class StartMonitoringInput {
    userId: number;
    userType: string;
    roomName?: string;
}
export declare class StopMonitoringInput {
    sessionId: string;
}
export declare class ActiveRoom {
    roomName: string;
    numParticipants: number;
    createdAt: Date;
    participantNames: string[];
}
