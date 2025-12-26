export declare class AuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type?: string;
    scope?: string;
    groups: string[];
    role: string;
    userId: number;
    email?: string;
}
export declare class TokenPayload {
    sub: string;
    email: string;
    name?: string;
    groups: string[];
}
export declare class UserInfo {
    id: number;
    role: string;
    email: string;
}
