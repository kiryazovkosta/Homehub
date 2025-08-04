import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, adminDashboardUrl, adminUsersUrl, adminFamiliesUrl} from "../../constants/api-constants";
import { AuthService } from "./auth.service";
import { DashboardResponse } from "../../models/admin/dashboard-response.model";
import { PaginationListResponse } from "../../models";
import { UserSimplyResponse } from "../../models/users/simple-user-response.model";
import { FamilyResponse } from "../../models/families/family-response.model";

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

    getUsers(): Observable<PaginationListResponse<UserSimplyResponse>> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        return this.httpClient.get<PaginationListResponse<UserSimplyResponse>>(`${this.apiUrl}${adminUsersUrl}`);
    }

    getFamilies(): Observable<PaginationListResponse<FamilyResponse>> {
        if (!this.isAdmin()) {
            throw new Error('You are not authorized to access this resource');
        }

        return this.httpClient.get<PaginationListResponse<FamilyResponse>>(`${this.apiUrl}${adminFamiliesUrl}`);
    }
}