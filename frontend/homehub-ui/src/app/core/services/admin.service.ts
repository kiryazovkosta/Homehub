import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, dashboardUrl } from "../../constants/api-constants";
import { AuthService } from "./auth.service";
import { DashboardResponse } from "../../models/admin/dashboard-response.model";

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

        return this.httpClient.get<DashboardResponse>(`${this.apiUrl}${dashboardUrl}`);
    }
}