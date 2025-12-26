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
var AudioMonitoringService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioMonitoringService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const livekit_service_1 = require("./livekit.service");
const audio_monitoring_dto_1 = require("./audio-monitoring.dto");
let AudioMonitoringService = AudioMonitoringService_1 = class AudioMonitoringService {
    prisma;
    liveKit;
    logger = new common_1.Logger(AudioMonitoringService_1.name);
    activeSessions = new Map();
    constructor(prisma, liveKit) {
        this.prisma = prisma;
        this.liveKit = liveKit;
    }
    roomNameFor(userId, userType) {
        return `room:${userType.toLowerCase()}:${userId}`;
    }
    normalizeUserType(userType) {
        const normalized = userType?.toUpperCase();
        if (normalized === 'COMMERCIAL' || normalized === 'MANAGER') {
            return normalized;
        }
        throw new common_1.ForbiddenException(`Unsupported user type`);
    }
    async getTargetMeta(userId, rawUserType) {
        const type = this.normalizeUserType(rawUserType);
        switch (type) {
            case 'COMMERCIAL': {
                const commercial = await this.prisma.commercial.findUnique({
                    where: { id: userId },
                    select: { id: true, managerId: true, directeurId: true },
                });
                if (!commercial) {
                    throw new common_1.NotFoundException('Commercial not found');
                }
                return {
                    id: commercial.id,
                    type,
                    managerId: commercial.managerId,
                    directeurId: commercial.directeurId,
                };
            }
            case 'MANAGER': {
                const manager = await this.prisma.manager.findUnique({
                    where: { id: userId },
                    select: { id: true, directeurId: true },
                });
                if (!manager) {
                    throw new common_1.NotFoundException('Manager not found');
                }
                return {
                    id: manager.id,
                    type,
                    directeurId: manager.directeurId,
                };
            }
        }
    }
    async getTargetFromRoomName(roomName) {
        const parts = roomName.split(':');
        if (parts.length !== 3 || parts[0] !== 'room') {
            return null;
        }
        const [, userType, userIdStr] = parts;
        const userId = Number(userIdStr);
        if (!Number.isFinite(userId)) {
            return null;
        }
        try {
            return await this.getTargetMeta(userId, userType);
        }
        catch (error) {
            this.logger.debug(`Unable to resolve target for room ${roomName}: ${error.message}`);
            return null;
        }
    }
    canViewRoom(target, viewerId, viewerRole) {
        if (viewerRole === 'admin') {
            return true;
        }
        if (viewerRole === 'directeur') {
            if (target.type === 'MANAGER') {
                return target.directeurId === viewerId;
            }
            if (target.type === 'COMMERCIAL') {
                return target.directeurId === viewerId;
            }
        }
        if (viewerRole === 'manager') {
            if (target.type === 'MANAGER') {
                return target.id === viewerId;
            }
            if (target.type === 'COMMERCIAL') {
                return target.managerId === viewerId;
            }
        }
        if (viewerRole === 'commercial') {
            return target.type === 'COMMERCIAL' && target.id === viewerId;
        }
        return false;
    }
    ensureMonitoringPermission(target, supervisorId, supervisorRole) {
        if (supervisorRole === 'admin') {
            return;
        }
        if (supervisorRole !== 'directeur') {
            throw new common_1.ForbiddenException('Only admins and directeurs can monitor users');
        }
        if (target.type === 'COMMERCIAL') {
            if (target.directeurId === supervisorId) {
                return;
            }
            throw new common_1.ForbiddenException('Cannot monitor this commercial');
        }
        if (target.type === 'MANAGER') {
            if (target.directeurId === supervisorId) {
                return;
            }
            throw new common_1.ForbiddenException('Cannot monitor this manager');
        }
    }
    validateRoomName(roomName, target) {
        const expected = this.roomNameFor(target.id, target.type);
        if (roomName && roomName !== expected) {
            throw new common_1.ForbiddenException('Invalid room name for this user');
        }
        return expected;
    }
    async startMonitoring(input, currentUser) {
        const supervisorId = currentUser.id;
        const target = await this.getTargetMeta(input.userId, input.userType);
        this.ensureMonitoringPermission(target, supervisorId, currentUser.role);
        const finalRoomName = this.validateRoomName(input.roomName, target);
        const existingSessions = Array.from(this.activeSessions.values()).filter((s) => s.userId === target.id &&
            s.userType === target.type &&
            s.supervisorId === supervisorId);
        for (const session of existingSessions) {
            this.logger.warn(`Cleaning up duplicate session: ${session.id}`);
            this.activeSessions.delete(session.id);
        }
        await this.liveKit.createOrJoinRoom(finalRoomName);
        const supConn = await this.liveKit.generateConnectionDetails(finalRoomName, `supervisor-${supervisorId}`, 'subscriber');
        const session = {
            id: `session-${Date.now()}`,
            userId: target.id,
            userType: target.type,
            roomName: finalRoomName,
            status: audio_monitoring_dto_1.MonitoringStatus.ACTIVE,
            startedAt: new Date(),
            supervisorId,
            participantToken: supConn.participantToken,
        };
        this.activeSessions.set(session.id, session);
        this.logger.log(`Monitoring started for ${target.type} ${target.id} in ${finalRoomName}`);
        return supConn;
    }
    async stopMonitoring(sessionId, currentUser) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            this.logger.warn(`Monitoring session ${sessionId} already stopped or not found`);
            return true;
        }
        if (currentUser.role !== 'admin' &&
            session.supervisorId !== currentUser.id) {
            throw new common_1.ForbiddenException('Cannot stop this monitoring session');
        }
        session.status = audio_monitoring_dto_1.MonitoringStatus.STOPPED;
        session.endedAt = new Date();
        try {
            await this.liveKit.disconnectParticipant(session.roomName, `supervisor-${session.supervisorId}`);
        }
        catch {
        }
        this.activeSessions.delete(sessionId);
        this.logger.log(`Monitoring stopped for session ${sessionId}`);
        return true;
    }
    async getActiveSessions(currentUser) {
        await this.cleanupGhostSessions();
        const sessions = Array.from(this.activeSessions.values());
        if (currentUser.role === 'admin') {
            return sessions;
        }
        const visibleSessions = [];
        for (const session of sessions) {
            if (session.supervisorId === currentUser.id) {
                visibleSessions.push(session);
                continue;
            }
            try {
                const target = await this.getTargetMeta(session.userId, session.userType);
                if (this.canViewRoom(target, currentUser.id, currentUser.role)) {
                    visibleSessions.push(session);
                }
            }
            catch {
            }
        }
        return visibleSessions;
    }
    async cleanupGhostSessions() {
        const rooms = await this.liveKit.listRoomsWithParticipants();
        const sessionsToDelete = [];
        for (const [sessionId, session] of this.activeSessions.entries()) {
            const room = rooms.find((r) => r.roomName === session.roomName);
            if (!room) {
                this.logger.warn(`Ghost session detected: room ${session.roomName} doesn't exist anymore`);
                sessionsToDelete.push(sessionId);
                continue;
            }
            const expectedParticipant = `${session.userType.toLowerCase()}-${session.userId}`;
            const userIsPresent = room.participants.some((p) => p === expectedParticipant);
            if (!userIsPresent) {
                this.logger.warn(`Ghost session detected: ${expectedParticipant} not in ${session.roomName}`);
                sessionsToDelete.push(sessionId);
            }
        }
        for (const sessionId of sessionsToDelete) {
            this.activeSessions.delete(sessionId);
            this.logger.log(`Ghost session ${sessionId} cleaned up`);
        }
    }
    async getActiveRooms(currentUser) {
        const rooms = await this.liveKit.listRoomsWithParticipants();
        const active = [];
        for (const r of rooms) {
            if (currentUser.role !== 'admin') {
                const target = await this.getTargetFromRoomName(r.roomName);
                if (!target) {
                    continue;
                }
                if (!this.canViewRoom(target, currentUser.id, currentUser.role)) {
                    continue;
                }
            }
            active.push({
                roomName: r.roomName,
                numParticipants: r.participants.length,
                createdAt: r.createdAt,
                participantNames: r.participants,
            });
        }
        active.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return active;
    }
    async generateCommercialToken(requestedCommercialId, roomName, currentUser) {
        if (!currentUser) {
            throw new common_1.ForbiddenException('Authentication required');
        }
        if (currentUser.role !== 'commercial') {
            throw new common_1.ForbiddenException('Only commercials can generate this token');
        }
        if (requestedCommercialId && requestedCommercialId !== currentUser.id) {
            this.logger.warn(`Commercial ${currentUser.id} attempted to request a token for ${requestedCommercialId}`);
        }
        const target = {
            id: currentUser.id,
            type: 'COMMERCIAL',
        };
        const finalRoomName = this.validateRoomName(roomName, target);
        await this.liveKit.createOrJoinRoom(finalRoomName);
        const conn = await this.liveKit.generateConnectionDetails(finalRoomName, `commercial-${currentUser.id}`, 'publisher');
        this.logger.log(`Commercial token generated for commercial ${currentUser.id} (room ${finalRoomName})`);
        return conn;
    }
    async generateManagerToken(requestedManagerId, roomName, currentUser) {
        if (!currentUser) {
            throw new common_1.ForbiddenException('Authentication required');
        }
        if (currentUser.role !== 'manager') {
            throw new common_1.ForbiddenException('Only managers can generate this token');
        }
        if (requestedManagerId && requestedManagerId !== currentUser.id) {
            this.logger.warn(`Manager ${currentUser.id} attempted to request a token for ${requestedManagerId}`);
        }
        const target = {
            id: currentUser.id,
            type: 'MANAGER',
        };
        const finalRoomName = this.validateRoomName(roomName, target);
        await this.liveKit.createOrJoinRoom(finalRoomName);
        const conn = await this.liveKit.generateConnectionDetails(finalRoomName, `manager-${currentUser.id}`, 'publisher');
        this.logger.log(`Manager token generated for manager ${currentUser.id} (room ${finalRoomName})`);
        return conn;
    }
};
exports.AudioMonitoringService = AudioMonitoringService;
exports.AudioMonitoringService = AudioMonitoringService = AudioMonitoringService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        livekit_service_1.LiveKitService])
], AudioMonitoringService);
//# sourceMappingURL=audio-monitoring.service.js.map