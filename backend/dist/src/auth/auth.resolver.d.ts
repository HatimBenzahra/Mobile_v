import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse, UserInfo } from './auth.types';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<AuthResponse>;
    refreshToken(refreshToken: string): Promise<AuthResponse>;
    me(user: {
        id: number;
        role: string;
        email: string;
    }): Promise<UserInfo>;
}
