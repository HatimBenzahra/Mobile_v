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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveRoom = exports.StopMonitoringInput = exports.StartMonitoringInput = exports.LiveKitConnectionDetails = exports.MonitoringSession = exports.MonitoringStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var MonitoringStatus;
(function (MonitoringStatus) {
    MonitoringStatus["ACTIVE"] = "ACTIVE";
    MonitoringStatus["STOPPED"] = "STOPPED";
    MonitoringStatus["PAUSED"] = "PAUSED";
})(MonitoringStatus || (exports.MonitoringStatus = MonitoringStatus = {}));
(0, graphql_1.registerEnumType)(MonitoringStatus, { name: 'MonitoringStatus' });
let MonitoringSession = class MonitoringSession {
    id;
    userId;
    userType;
    roomName;
    status;
    startedAt;
    endedAt;
    supervisorId;
    participantToken;
};
exports.MonitoringSession = MonitoringSession;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], MonitoringSession.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MonitoringSession.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MonitoringSession.prototype, "userType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MonitoringSession.prototype, "roomName", void 0);
__decorate([
    (0, graphql_1.Field)(() => MonitoringStatus),
    __metadata("design:type", String)
], MonitoringSession.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date)
], MonitoringSession.prototype, "startedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    __metadata("design:type", Date)
], MonitoringSession.prototype, "endedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MonitoringSession.prototype, "supervisorId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MonitoringSession.prototype, "participantToken", void 0);
exports.MonitoringSession = MonitoringSession = __decorate([
    (0, graphql_1.ObjectType)()
], MonitoringSession);
let LiveKitConnectionDetails = class LiveKitConnectionDetails {
    serverUrl;
    participantToken;
    roomName;
    participantName;
};
exports.LiveKitConnectionDetails = LiveKitConnectionDetails;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LiveKitConnectionDetails.prototype, "serverUrl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LiveKitConnectionDetails.prototype, "participantToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LiveKitConnectionDetails.prototype, "roomName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LiveKitConnectionDetails.prototype, "participantName", void 0);
exports.LiveKitConnectionDetails = LiveKitConnectionDetails = __decorate([
    (0, graphql_1.ObjectType)()
], LiveKitConnectionDetails);
let StartMonitoringInput = class StartMonitoringInput {
    userId;
    userType;
    roomName;
};
exports.StartMonitoringInput = StartMonitoringInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StartMonitoringInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], StartMonitoringInput.prototype, "userType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], StartMonitoringInput.prototype, "roomName", void 0);
exports.StartMonitoringInput = StartMonitoringInput = __decorate([
    (0, graphql_1.InputType)()
], StartMonitoringInput);
let StopMonitoringInput = class StopMonitoringInput {
    sessionId;
};
exports.StopMonitoringInput = StopMonitoringInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], StopMonitoringInput.prototype, "sessionId", void 0);
exports.StopMonitoringInput = StopMonitoringInput = __decorate([
    (0, graphql_1.InputType)()
], StopMonitoringInput);
let ActiveRoom = class ActiveRoom {
    roomName;
    numParticipants;
    createdAt;
    participantNames;
};
exports.ActiveRoom = ActiveRoom;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ActiveRoom.prototype, "roomName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ActiveRoom.prototype, "numParticipants", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date)
], ActiveRoom.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], ActiveRoom.prototype, "participantNames", void 0);
exports.ActiveRoom = ActiveRoom = __decorate([
    (0, graphql_1.ObjectType)()
], ActiveRoom);
//# sourceMappingURL=audio-monitoring.dto.js.map