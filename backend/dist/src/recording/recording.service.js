"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RecordingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingService = void 0;
const common_1 = require("@nestjs/common");
const livekit_server_sdk_1 = require("livekit-server-sdk");
const livekit_server_sdk_2 = require("livekit-server-sdk");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const prisma_service_1 = require("../prisma.service");
let RecordingService = RecordingService_1 = class RecordingService {
    prisma;
    logger = new common_1.Logger(RecordingService_1.name);
    lkHost = process.env.LK_HOST;
    lkApiKey = process.env.LK_API_KEY;
    lkApiSecret = process.env.LK_API_SECRET;
    region = process.env.AWS_REGION || 'eu-west-3';
    bucket = process.env.S3_BUCKET_NAME;
    prefix = process.env.S3_PREFIX || 'recordings/';
    awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
    awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
    egress = new livekit_server_sdk_1.EgressClient(this.lkHost.replace(/^wss?:\/\//, 'https://'), this.lkApiKey, this.lkApiSecret);
    s3 = new client_s3_1.S3Client({
        region: this.region,
        credentials: {
            accessKeyId: this.awsAccessKey,
            secretAccessKey: this.awsSecretKey,
        },
    });
    safeRoom(roomName) {
        return roomName.replace(/[:]/g, '_');
    }
    urlCache = new Map();
    constructor(prisma) {
        this.prisma = prisma;
    }
    normalizeRoomName(roomName) {
        if (roomName.includes(':')) {
            return roomName;
        }
        const legacy = roomName.split('_');
        if (legacy.length === 3 && legacy[0] === 'room') {
            return `room:${legacy[1]}:${legacy[2]}`;
        }
        return roomName;
    }
    parseRoomIdentifier(roomName) {
        const normalized = this.normalizeRoomName(roomName);
        const parts = normalized.split(':');
        if (parts.length !== 3) {
            return null;
        }
        const type = parts[1].toUpperCase();
        const id = Number(parts[2]);
        if (!Number.isFinite(id)) {
            return null;
        }
        if (type !== 'COMMERCIAL' && type !== 'MANAGER') {
            return null;
        }
        return { type: type, id };
    }
    parseParticipantIdentity(identity) {
        if (!identity) {
            return null;
        }
        const [rawType, rawId] = identity.split('-');
        if (!rawType || !rawId) {
            return null;
        }
        const type = rawType.toUpperCase();
        const id = Number(rawId);
        if (!Number.isFinite(id)) {
            return null;
        }
        if (type !== 'COMMERCIAL' && type !== 'MANAGER') {
            return null;
        }
        return { type: type, id };
    }
    async ensureRoomAccess(roomName, userId, userRole) {
        const target = this.parseRoomIdentifier(roomName);
        if (!target) {
            if (userRole === 'admin') {
                return null;
            }
            throw new common_1.ForbiddenException('Invalid room identifier');
        }
        if (userRole === 'admin') {
            return target;
        }
        if (target.type === 'COMMERCIAL') {
            const commercial = await this.prisma.commercial.findUnique({
                where: { id: target.id },
                select: { id: true, managerId: true, directeurId: true },
            });
            if (!commercial) {
                throw new common_1.NotFoundException('Commercial not found');
            }
            if (userRole === 'commercial' && commercial.id === userId) {
                return target;
            }
            if (userRole === 'directeur' && commercial.directeurId === userId) {
                return target;
            }
            if (userRole === 'manager' && commercial.managerId === userId) {
                return target;
            }
            throw new common_1.ForbiddenException('Access denied to this room');
        }
        if (target.type === 'MANAGER') {
            const manager = await this.prisma.manager.findUnique({
                where: { id: target.id },
                select: { id: true, directeurId: true },
            });
            if (!manager) {
                throw new common_1.NotFoundException('Manager not found');
            }
            if (userRole === 'directeur' && manager.directeurId === userId) {
                return target;
            }
            if (userRole === 'manager' && manager.id === userId) {
                return target;
            }
            throw new common_1.ForbiddenException('Access denied to this room');
        }
        throw new common_1.ForbiddenException('Unsupported room target');
    }
    extractRoomFromKey(key) {
        if (!key.startsWith(this.prefix)) {
            return null;
        }
        const remainder = key.slice(this.prefix.length);
        const [safeRoom] = remainder.split('/');
        if (!safeRoom) {
            return null;
        }
        return safeRoom.replace(/_/g, ':');
    }
    async signedUrlOrUndefined(key) {
        try {
            const cached = this.urlCache.get(key);
            if (cached && Date.now() < cached.expiry) {
                return cached.url;
            }
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
                ResponseContentType: 'audio/mp4',
                ResponseCacheControl: 'no-cache',
            });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, {
                expiresIn: 3600,
            });
            this.urlCache.set(key, {
                url,
                expiry: Date.now() + 50 * 60 * 1000,
            });
            return url;
        }
        catch {
            return undefined;
        }
    }
    async startRecording(input, currentUser) {
        const { roomName, audioOnly = true, participantIdentity, immeubleId, } = input;
        const target = await this.ensureRoomAccess(roomName, currentUser.id, currentUser.role);
        if (participantIdentity && target) {
            const parsed = this.parseParticipantIdentity(participantIdentity);
            if (!parsed || parsed.type !== target.type || parsed.id !== target.id) {
                throw new common_1.ForbiddenException('Participant identity does not match the room owner');
            }
        }
        const safe = this.safeRoom(roomName);
        const ts = new Date().toISOString().replace(/[:]/g, '-');
        let addressPart = '';
        if (immeubleId) {
            const immeuble = await this.prisma.immeuble.findUnique({
                where: { id: immeubleId },
                select: { adresse: true },
            });
            if (immeuble?.adresse) {
                addressPart = immeuble.adresse.replace(/[^a-z0-9]/gi, '_') + '_';
            }
        }
        const fileKey = `${this.prefix}${safe}/${addressPart}${ts}.mp4`;
        const fileOutput = new livekit_server_sdk_2.EncodedFileOutput({
            fileType: livekit_server_sdk_2.EncodedFileType.MP4,
            filepath: fileKey,
            output: {
                case: 's3',
                value: new livekit_server_sdk_2.S3Upload({
                    bucket: this.bucket,
                    region: this.region,
                    accessKey: this.awsAccessKey,
                    secret: this.awsSecretKey,
                }),
            },
        });
        let info;
        if (participantIdentity) {
            info = await this.egress.startParticipantEgress(roomName, participantIdentity, { file: fileOutput }, { screenShare: false });
        }
        else {
            info = await this.egress.startRoomCompositeEgress(roomName, fileOutput, { audioOnly });
        }
        this.logger.log(`Recording started: egressId=${info.egressId} room=${roomName} key=${fileKey}`);
        const url = await this.signedUrlOrUndefined(fileKey);
        return {
            egressId: info.egressId,
            roomName,
            status: String(info.status),
            s3Key: fileKey,
            url,
        };
    }
    async stopRecording(egressId, currentUser) {
        try {
            const list = await this.egress.listEgress({ egressId });
            const info = list[0];
            if (info?.roomName) {
                await this.ensureRoomAccess(info.roomName, currentUser.id, currentUser.role);
            }
            else if (currentUser.role !== 'admin') {
                throw new common_1.ForbiddenException('Cannot verify recording ownership');
            }
            await this.egress.stopEgress(egressId);
            return true;
        }
        catch (e) {
            if (e instanceof common_1.ForbiddenException) {
                throw e;
            }
            this.logger.warn(`stopRecording(${egressId}): ${e?.message || e}`);
            return false;
        }
    }
    async listRecordings(roomName, currentUser) {
        await this.ensureRoomAccess(roomName, currentUser.id, currentUser.role);
        const safe = this.safeRoom(roomName);
        const prefix = `${this.prefix}${safe}/`;
        const out = [];
        const resp = await this.s3.send(new client_s3_1.ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: prefix,
        }));
        for (const obj of resp.Contents || []) {
            if (!obj.Key)
                continue;
            out.push({
                key: obj.Key,
                size: obj.Size,
                lastModified: obj.LastModified,
                url: await this.signedUrlOrUndefined(obj.Key),
            });
        }
        out.sort((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0));
        return out;
    }
    async egressState(egressId, currentUser) {
        const list = await this.egress.listEgress({ egressId });
        const info = list[0];
        if (!info) {
            return { egressId, status: 'UNKNOWN' };
        }
        if (info.roomName) {
            await this.ensureRoomAccess(info.roomName, currentUser.id, currentUser.role);
        }
        else if (currentUser.role !== 'admin') {
            throw new common_1.ForbiddenException('Cannot verify recording ownership');
        }
        return {
            egressId: info.egressId || info.id,
            status: String(info.status),
            roomName: info.roomName,
            error: info.error,
        };
    }
    async getStreamingUrl(key, currentUser) {
        const roomName = this.extractRoomFromKey(key);
        if (roomName) {
            await this.ensureRoomAccess(roomName, currentUser.id, currentUser.role);
        }
        else if (currentUser.role !== 'admin') {
            throw new common_1.ForbiddenException('Unknown recording key');
        }
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
                ResponseContentType: 'audio/mp4',
                ResponseContentDisposition: 'inline',
            });
            return await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, {
                expiresIn: 7200,
            });
        }
        catch (error) {
            this.logger.error(`Erreur génération URL streaming: ${error.message}`);
            throw error;
        }
    }
};
exports.RecordingService = RecordingService;
exports.RecordingService = RecordingService = RecordingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecordingService);
//# sourceMappingURL=recording.service.js.map