import { inject, Injectable, signal } from "@angular/core";
import { LoginUserRequest } from "../../models/auth/login-user-request.model";
import { HttpClient } from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AccessTokenResponse } from "../../models/auth/access-token-response.model";
import { authBaseUrl, loginEndpoint, refreshEndpoint, registerEndpoint, accessTokenKey, refreshTokenKey } from "../../constants/auth-constants";
import { RegisterUserRequest } from "../../models/auth/register-user-request.model";

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

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public jwtToken = this._jwtToken.asReadonly();
    public refreshToken = this._refreshToken.asReadonly();

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

    register(registerRequest: RegisterUserRequest): Observable<boolean> {
        return this.httpClient.post<AccessTokenResponse>(this.registerUrl, registerRequest).pipe(
            tap(tokens => {
                this.saveTokens(tokens);
                this._isLoggedIn.set(true);
                this._jwtToken.set(tokens.accessToken);
                this._refreshToken.set(tokens.refreshToken);
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
            }),
            map((response) => response.accessToken),
            catchError(error => {
                this._isLoggedIn.set(false);
                this._jwtToken.set(null);
                this._refreshToken.set(null);
                return of(null);
            })
        );
    }

    private isTokenValid(token: string) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
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

    private removeTokens(): void {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
}