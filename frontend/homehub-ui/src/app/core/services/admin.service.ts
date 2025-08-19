import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { 
    DashboardResponse, 
    PaginationListResponse, 
    UserAdminResponse, 
    UserSimplyResponse, 
    FamilyResponse, 
    UpdateUserFromAdminRequest, 
    RegisterUserRequest, 
    CreateFamilyRequest, 
    UpdateFamilyRequest 
} from "../../models";
import {
    adminDashboardUrl, 
    adminUsersUrl, 
    adminCreateUserUrl,
    adminUpdateUserUrl,
    adminDeleteUserUrl,
    adminFamiliesUrl, 
    adminCreateFamilyUrl,
    adminUpdateFamilyUrl,
    adminDeleteFamilyUrl
} from "../../constants/api-constants";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private readonly apiAddress = environment.apiAddress;

    private readonly dashboardUrl = `${this.apiAddress}${adminDashboardUrl}`;
    private readonly usersUrl = `${this.apiAddress}${adminUsersUrl}`;
    private readonly userCreateUrl = `${this.apiAddress}${adminCreateUserUrl}`;
    private readonly userUpdateUrl = `${this.apiAddress}${adminUpdateUserUrl}`;
    private readonly userDeleteUrl = `${this.apiAddress}${adminDeleteUserUrl}`;

    private readonly familiesUrl = `${this.apiAddress}${adminFamiliesUrl}`;
    private readonly familyCreateUrl = `${this.apiAddress}${adminCreateFamilyUrl}`;
    private readonly familyUpdateUrl = `${this.apiAddress}${adminUpdateFamilyUrl}`;
    private readonly familyDeleteUrl = `${this.apiAddress}${adminDeleteFamilyUrl}`;

    private readonly authService: AuthService = inject(AuthService);
    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly isAdmin = computed(() => this.authService.isAdmin());

    getDashboard(): Observable<DashboardResponse> {
        this.validatePermisions();
        return this.httpClient.get<DashboardResponse>(this.dashboardUrl);
    }

    getUsers(pagination: { page:number, pageSize: number }): Observable<PaginationListResponse<UserAdminResponse>> {
        this.validatePermisions();
        return this.httpClient.get<PaginationListResponse<UserAdminResponse>>(this.usersUrl, { params: pagination });
    }

    getFamilies(): Observable<PaginationListResponse<FamilyResponse>> {
        this.validatePermisions();
        return this.httpClient.get<PaginationListResponse<FamilyResponse>>(this.familiesUrl);
    }

    registerUser(userData: RegisterUserRequest): Observable<UserSimplyResponse> {
        this.validatePermisions();
        return this.httpClient.post<UserSimplyResponse>(this.userCreateUrl, userData);
    }

    updateUser(userData: UpdateUserFromAdminRequest) : Observable<string> {
        this.validatePermisions();
        return this.httpClient.put(this.userUpdateUrl, userData, { 
            responseType: 'text' 
        });
    }

    deleteUser(id: string) : Observable<void> {
        this.validatePermisions();
        const path: string = `${this.userDeleteUrl}`+id;
        return this.httpClient.delete<void>(path);
    }

    createFamily(userData: CreateFamilyRequest): Observable<FamilyResponse> {
        this.validatePermisions();
        return this.httpClient.post<FamilyResponse>(this.familyCreateUrl, userData);
    }

    updateFamily(userData: UpdateFamilyRequest) : Observable<void> {
        this.validatePermisions();
        return this.httpClient.put<void>(this.familyUpdateUrl, userData);
    }

    deleteFamily(id: string) : Observable<void> {
        this.validatePermisions();
        const path: string = this.familyDeleteUrl + id;
        return this.httpClient.delete<void>(path);
    }

    // Create an interseptor to check that request contains management
    private validatePermisions(): void {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }
    }
}

