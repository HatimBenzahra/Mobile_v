import { RecordingResult, StartRecordingInput, StopRecordingInput, RecordingItem, EgressState } from './recording.dto';
import { RecordingService } from './recording.service';
export declare class RecordingResolver {
    private readonly svc;
    constructor(svc: RecordingService);
    startRecording(input: StartRecordingInput, user: any): Promise<RecordingResult>;
    stopRecording(input: StopRecordingInput, user: any): Promise<boolean>;
    listRecordings(roomName: string, user: any): Promise<RecordingItem[]>;
    egressState(egressId: string, user: any): Promise<EgressState>;
    getStreamingUrl(key: string, user: any): Promise<string>;
}
