import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { 
    baseUrl, 
    adminDashboardUrl, 
    adminUsersUrl, 
    adminFamiliesUrl, 
    adminUpdateUserUrl 
} from "../../constants/api-constants";
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

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private readonly apiUrl = `${baseUrl}`;

    private readonly authService: AuthService = inject(AuthService);
    private readonly httpClient: HttpClient = inject(HttpClient);

    private readonly isAdmin = computed(() => this.authService.isAdmin());

    getDashboard(): Observable<DashboardResponse> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        return this.httpClient.get<DashboardResponse>(`${this.apiUrl}${adminDashboardUrl}`);
    }

    getUsers(pagination: { page:number, pageSize: number }): Observable<PaginationListResponse<UserAdminResponse>> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        return this.httpClient.get<PaginationListResponse<UserAdminResponse>>(`${this.apiUrl}${adminUsersUrl}`, { params: pagination });
    }

    getFamilies(): Observable<PaginationListResponse<FamilyResponse>> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        return this.httpClient.get<PaginationListResponse<FamilyResponse>>(`${this.apiUrl}${adminFamiliesUrl}`);
    }

    registerUser(userData: RegisterUserRequest): Observable<UserSimplyResponse> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        const response = this.httpClient.post<UserSimplyResponse>(`${this.apiUrl}api/admin/users/register`, userData);
        console.log(response);
        return response;
    }

    updateUser(userData: UpdateUserFromAdminRequest) : Observable<string> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        console.log(userData);
        return this.httpClient.put(`${this.apiUrl}${adminUpdateUserUrl}`, userData, { 
            responseType: 'text' 
        });
    }

    deleteUser(id: string) : Observable<void> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        console.log(id);
        const path: string = `${this.apiUrl}api/admin/users/delete/`+id;
        return this.httpClient.delete<void>(path);
    }

    createFamily(userData: CreateFamilyRequest): Observable<FamilyResponse> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        const response = this.httpClient.post<FamilyResponse>(`${this.apiUrl}api/admin/families/create`, userData);
        console.log(response);
        return response;
    }

    updateFamily(userData: UpdateFamilyRequest) : Observable<void> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        console.log(userData);
        return this.httpClient.put<void>(`${this.apiUrl}api/admin/families/update`, userData);
    }

    deleteFamily(id: string) : Observable<void> {
        if (!this.isAdmin()) {
            throw new Error('Не се оторизирани за този ресурс.');
        }

        const path: string = `${this.apiUrl}api/admin/families/delete/`+id;
        return this.httpClient.delete<void>(path);
    }
}

