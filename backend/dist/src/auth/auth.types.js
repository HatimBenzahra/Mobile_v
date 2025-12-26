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
exports.UserInfo = exports.TokenPayload = exports.AuthResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
let AuthResponse = class AuthResponse {
    access_token;
    refresh_token;
    expires_in;
    token_type;
    scope;
    groups;
    role;
    userId;
    email;
};
exports.AuthResponse = AuthResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthResponse.prototype, "access_token", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthResponse.prototype, "refresh_token", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], AuthResponse.prototype, "expires_in", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "token_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "scope", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], AuthResponse.prototype, "groups", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthResponse.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], AuthResponse.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "email", void 0);
exports.AuthResponse = AuthResponse = __decorate([
    (0, graphql_1.ObjectType)()
], AuthResponse);
let TokenPayload = class TokenPayload {
    sub;
    email;
    name;
    groups;
};
exports.TokenPayload = TokenPayload;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TokenPayload.prototype, "sub", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TokenPayload.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TokenPayload.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], TokenPayload.prototype, "groups", void 0);
exports.TokenPayload = TokenPayload = __decorate([
    (0, graphql_1.ObjectType)()
], TokenPayload);
let UserInfo = class UserInfo {
    id;
    role;
    email;
};
exports.UserInfo = UserInfo;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfo.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfo.prototype, "email", void 0);
exports.UserInfo = UserInfo = __decorate([
    (0, graphql_1.ObjectType)()
], UserInfo);
//# sourceMappingURL=auth.types.js.map