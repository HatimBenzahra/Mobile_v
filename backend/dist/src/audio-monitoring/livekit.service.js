"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LiveKitService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveKitService = void 0;
const common_1 = require("@nestjs/common");
const livekit_server_sdk_1 = require("livekit-server-sdk");
let LiveKitService = LiveKitService_1 = class LiveKitService {
    logger = new common_1.Logger(LiveKitService_1.name);
    host = process.env.LK_HOST;
    apiKey = process.env.LK_API_KEY;
    apiSecret = process.env.LK_API_SECRET;
    rsc = new livekit_server_sdk_1.RoomServiceClient(this.host.replace(/^wss:\/\//, 'https://').replace(/^ws:\/\//, 'http://'), this.apiKey, this.apiSecret);
    async generateConnectionDetails(roomName, identity, role) {
        const at = new livekit_server_sdk_1.AccessToken(this.apiKey, this.apiSecret, { identity });
        at.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: role === 'publisher',
            canSubscribe: true,
        });
        at.ttl = '1h';
        const token = await at.toJwt();
        const publicHost = process.env.PUBLIC_HOST || 'localhost:3000';
        const serverUrl = `wss://${publicHost}/livekit-proxy`;
        return {
            serverUrl,
            participantToken: token,
            roomName,
            participantName: identity,
        };
    }
    async createOrJoinRoom(roomName) {
        try {
            await this.rsc.createRoom({ name: roomName });
        }
        catch (e) {
            if (e?.response?.status !== 409) {
                this.logger.warn(`createRoom(${roomName}): ${e.message}`);
            }
        }
    }
    async disconnectParticipant(roomName, identity) {
        try {
            await this.rsc.removeParticipant(roomName, identity);
        }
        catch (e) {
            this.logger.warn(`removeParticipant(${roomName}, ${identity}): ${e.message}`);
        }
    }
    async listRoomsWithParticipants() {
        try {
            const rooms = await this.rsc.listRooms();
            const out = [];
            for (const r of rooms) {
                try {
                    const parts = await this.rsc.listParticipants(r.name);
                    out.push({
                        roomName: r.name,
                        createdAt: new Date(r.creationTime
                            ? Number(r.creationTime) * 1000
                            : Date.now()),
                        participants: parts.map((p) => p.identity),
                    });
                }
                catch (e) {
                    if (e?.response?.status === 404 ||
                        e?.message?.includes('not exist')) {
                        this.logger.debug(`Room ${r.name} no longer exists, skipping`);
                        continue;
                    }
                    throw e;
                }
            }
            return out;
        }
        catch (e) {
            this.logger.error(`Error listing rooms: ${e.message}`);
            return [];
        }
    }
};
exports.LiveKitService = LiveKitService;
exports.LiveKitService = LiveKitService = LiveKitService_1 = __decorate([
    (0, common_1.Injectable)()
], LiveKitService);
//# sourceMappingURL=livekit.service.js.map