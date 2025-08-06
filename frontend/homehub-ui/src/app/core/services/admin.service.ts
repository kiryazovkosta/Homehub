import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, adminDashboardUrl, adminUsersUrl, adminFamiliesUrl, adminUpdateUserUrl, adminDeleteUserUrl } from "../../constants/api-constants";
import { AuthService } from "./auth.service";
import { DashboardResponse } from "../../models/admin/dashboard-response.model";
import { PaginationListResponse } from "../../models";
import { UserAdminResponse, UserSimplyResponse } from "../../models/users/simple-user-response.model";
import { FamilyResponse } from "../../models/families/family-response.model";
import { UpdateUserFromAdminRequest } from "../../models/admin/update-user-from-admin-request.model";
import { RegisterUserRequest } from "../../models/auth/register-user-request.model";

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
            throw new Error('You are not authorized to access this resource');
        }

        return this.httpClient.get<DashboardResponse>(`${this.apiUrl}${adminDashboardUrl}`);
    }

    getUsers(pagination: { page:number, pageSize: number }): Observable<PaginationListResponse<UserAdminResponse>> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        return this.httpClient.get<PaginationListResponse<UserAdminResponse>>(`${this.apiUrl}${adminUsersUrl}`, { params: pagination });
    }

    getFamilies(): Observable<PaginationListResponse<FamilyResponse>> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        return this.httpClient.get<PaginationListResponse<FamilyResponse>>(`${this.apiUrl}${adminFamiliesUrl}`);
    }

    registerUser(userData: RegisterUserRequest): Observable<UserSimplyResponse> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        const response = this.httpClient.post<UserSimplyResponse>(`${this.apiUrl}api/admin/users/register`, userData);
        console.log(response);
        return response;
    }

    updateUser(userData: UpdateUserFromAdminRequest) : Observable<string> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        console.log(userData);
        return this.httpClient.put(`${this.apiUrl}${adminUpdateUserUrl}`, userData, { 
            responseType: 'text' 
        });
    }

    deleteUser(id: string) : Observable<void> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        console.log(id);
        const path: string = `${this.apiUrl}api/admin/users/delete/`+id;
        return this.httpClient.delete<void>(path);
    }
}

