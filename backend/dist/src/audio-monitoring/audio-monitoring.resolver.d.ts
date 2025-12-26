import { AudioMonitoringService } from './audio-monitoring.service';
import { MonitoringSession, LiveKitConnectionDetails, StartMonitoringInput, StopMonitoringInput, ActiveRoom } from './audio-monitoring.dto';
export declare class AudioMonitoringResolver {
    private audioMonitoringService;
    constructor(audioMonitoringService: AudioMonitoringService);
    startMonitoring(input: StartMonitoringInput, user: any): Promise<LiveKitConnectionDetails>;
    stopMonitoring(input: StopMonitoringInput, user: any): Promise<boolean>;
    getActiveSessions(user: any): Promise<MonitoringSession[]>;
    getActiveRooms(user: any): Promise<ActiveRoom[]>;
    generateCommercialToken(commercialId: number | undefined, roomName?: string, user?: any): Promise<LiveKitConnectionDetails>;
    generateManagerToken(managerId: number | undefined, roomName?: string, user?: any): Promise<LiveKitConnectionDetails>;
}
