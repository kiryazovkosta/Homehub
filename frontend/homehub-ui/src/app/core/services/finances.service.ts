import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { FinanceResponse, PaginationListResponse, FinanceListResponse } from "../../models";
import { baseUrl, financesUrl } from "../../constants/api-constants";

@Injectable({
    providedIn: 'root'
})
export class FinancesService {
    private readonly apiUrl = `${baseUrl}${financesUrl}`;

    constructor(private httpClient: HttpClient){}

    getFinances(pagination: { page:number, pageSize: number }): Observable<PaginationListResponse<FinanceListResponse>> {
        return this.httpClient.get<PaginationListResponse<FinanceListResponse>>(this.apiUrl, { params: pagination });
    }

    getFinance(id: string) : Observable<FinanceResponse> {
        return this.httpClient.get<FinanceResponse>(`${this.apiUrl}/${id}`);
    }
}