import { inject, Injectable, signal } from "@angular/core";
import { LoginUserRequest } from "../../models/auth/login-user-request.model";
import { HttpClient } from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { jwtDecode, JwtPayload } from 'jwt-decode';

import { AccessTokenResponse } from "../../models/auth/access-token-response.model";
import { authBaseUrl, loginEndpoint, refreshEndpoint, registerEndpoint, accessTokenKey, refreshTokenKey } from "../../constants/auth-constants";
import { RegisterUserRequest, FamilyRole, familyRoleLabels } from "../../models/auth/register-user-request.model";
import { CustomJwtPayload } from "../../models/auth/custom-jwt-payload.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginUrl = `${authBaseUrl}${loginEndpoint}`;
    private readonly registerUrl = `${authBaseUrl}${registerEndpoint}`;
    private readonly refreshTokenUrl = `${authBaseUrl}${refreshEndpoint}`;

    private httpClient: HttpClient = inject(HttpClient);

    private _isLoggedIn = signal<boolean>(false);
    private _jwtToken = signal<string | null>(null);
    private _refreshToken = signal<string | null>(null);
    private _isAdmin = signal<boolean>(false);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public jwtToken = this._jwtToken.asReadonly();
    public refreshToken = this._refreshToken.asReadonly();
    public isAdmin = this._isAdmin.asReadonly();

    constructor() {
        const currentJwt = localStorage.getItem(accessTokenKey);
        const currentRefreshToken = localStorage.getItem(refreshTokenKey);

        if (currentJwt && this.isTokenValid(currentJwt)) {
            this._isLoggedIn.set(true);
            this._jwtToken.set(currentJwt);
        }

        if (currentRefreshToken) {
            this._refreshToken.set(currentRefreshToken);
        }
    }

    login(loginRequest: LoginUserRequest): Observable<boolean> {
        return this.httpClient.post<AccessTokenResponse>(this.loginUrl, loginRequest).pipe(
            tap(tokens => {
                this.saveTokens(tokens);
                this._isLoggedIn.set(true);
                this._jwtToken.set(tokens.accessToken);
                this._refreshToken.set(tokens.refreshToken);
                const decoded = jwtDecode<CustomJwtPayload>(tokens.accessToken);
                const roles = this.extractRoles(decoded);
                this._isAdmin.set(roles.includes('Administrator'));
            }),
            map(() => true),
            catchError(error => {
                this._isLoggedIn.set(false);
                this._jwtToken.set(null);
                this._refreshToken.set(null);
                this._isAdmin.set(false);
                return of(false);
            })
        );
    }

    register(registerRequest: RegisterUserRequest): Observable<boolean> {
        return this.httpClient.post<AccessTokenResponse>(this.registerUrl, registerRequest).pipe(
            tap(tokens => {
                this.saveTokens(tokens);
                this._isLoggedIn.set(true);
                this._jwtToken.set(tokens.accessToken);
                this._refreshToken.set(tokens.refreshToken);
                const decoded = jwtDecode<CustomJwtPayload>(tokens.accessToken);
                const roles = this.extractRoles(decoded);
                this._isAdmin.set(roles.includes('Administrator'));
            }),
            map(() => true),
            catchError(error => {
                this._isLoggedIn.set(false);
                this._jwtToken.set(null);
                this._refreshToken.set(null);
                return of(false);
            })
        );
    }

    logout(): void {
        this._isLoggedIn.set(false);
        this._jwtToken.set(null);
        this._refreshToken.set(null);
        this._isAdmin.set(false);
        this.removeTokens();
    }

    validateToken(token: string) {
        return this.isTokenValid(token);
    }

    refresh(token: string) : Observable<string|null> {
        return this.httpClient.post<AccessTokenResponse>(this.refreshTokenUrl, { refreshToken: token }).pipe(
            tap(tokens => {
                this.saveTokens(tokens);
                this._isLoggedIn.set(true);
                this._jwtToken.set(tokens.accessToken);
                this._refreshToken.set(tokens.refreshToken);
                const decoded = jwtDecode<CustomJwtPayload>(tokens.accessToken);
                const roles = this.extractRoles(decoded);
                this._isAdmin.set(roles.includes('Administrator'));
            }),
            map((response) => response.accessToken),
            catchError(error => {
                this._isLoggedIn.set(false);
                this._jwtToken.set(null);
                this._refreshToken.set(null);
                this._isAdmin.set(false);
                return of(null);
            })
        );
    }

    getUserId() : string|undefined {
        const token = this._jwtToken();

        if (token && this.isTokenValid(token)) {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            return `u_${decoded?.sub}`;
        }

        return undefined;
    }

    getRoles(): string[] {
        const token = this._jwtToken();
        if (token && this.isTokenValid(token)) {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            return this.extractRoles(decoded);
        }
        return [];
    }

    getFamilyRoles(): Observable<{ value: number, label: string }[]> {
        const roles = Object.entries(familyRoleLabels).map(([value, label]) => ({ value: Number(value), label }));
        return of(roles);
    }

    private isTokenValid(token: string) {
        try {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            const expirationTime = decoded?.exp || 0;
            return expirationTime > currentTime;
        } catch {
            return false;
        }
    }

    private saveTokens(tokens: AccessTokenResponse): void {
        localStorage.setItem(accessTokenKey, tokens.accessToken);
        localStorage.setItem(refreshTokenKey, tokens.refreshToken);
    }

    private extractRoles(decodedToken: CustomJwtPayload): string[] {
        const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        const role = decodedToken[roleClaim];
        
        if (!role) {
            return [];
        }
        
        if (Array.isArray(role)) {
            return role;
        } else {
            return [role];
        }
    }

    private removeTokens(): void {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
}