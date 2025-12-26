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
exports.StopRecordingInput = exports.StartRecordingInput = exports.EgressState = exports.RecordingItem = exports.RecordingResult = void 0;
const graphql_1 = require("@nestjs/graphql");
let RecordingResult = class RecordingResult {
    egressId;
    roomName;
    status;
    s3Key;
    url;
};
exports.RecordingResult = RecordingResult;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecordingResult.prototype, "egressId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecordingResult.prototype, "roomName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecordingResult.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecordingResult.prototype, "s3Key", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RecordingResult.prototype, "url", void 0);
exports.RecordingResult = RecordingResult = __decorate([
    (0, graphql_1.ObjectType)()
], RecordingResult);
let RecordingItem = class RecordingItem {
    key;
    url;
    size;
    lastModified;
};
exports.RecordingItem = RecordingItem;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecordingItem.prototype, "key", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RecordingItem.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], RecordingItem.prototype, "size", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], RecordingItem.prototype, "lastModified", void 0);
exports.RecordingItem = RecordingItem = __decorate([
    (0, graphql_1.ObjectType)()
], RecordingItem);
let EgressState = class EgressState {
    egressId;
    status;
    roomName;
    error;
};
exports.EgressState = EgressState;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], EgressState.prototype, "egressId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], EgressState.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EgressState.prototype, "roomName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EgressState.prototype, "error", void 0);
exports.EgressState = EgressState = __decorate([
    (0, graphql_1.ObjectType)()
], EgressState);
let StartRecordingInput = class StartRecordingInput {
    roomName;
    audioOnly;
    participantIdentity;
    immeubleId;
};
exports.StartRecordingInput = StartRecordingInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], StartRecordingInput.prototype, "roomName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: true }),
    __metadata("design:type", Boolean)
], StartRecordingInput.prototype, "audioOnly", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], StartRecordingInput.prototype, "participantIdentity", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], StartRecordingInput.prototype, "immeubleId", void 0);
exports.StartRecordingInput = StartRecordingInput = __decorate([
    (0, graphql_1.InputType)()
], StartRecordingInput);
let StopRecordingInput = class StopRecordingInput {
    egressId;
};
exports.StopRecordingInput = StopRecordingInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], StopRecordingInput.prototype, "egressId", void 0);
exports.StopRecordingInput = StopRecordingInput = __decorate([
    (0, graphql_1.InputType)()
], StopRecordingInput);
//# sourceMappingURL=recording.dto.js.map