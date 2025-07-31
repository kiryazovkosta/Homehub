import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { FinanceResponse, PaginationListResponse, FinanceListResponse, CategorySimpleResponse } from "../../models";
import { baseUrl, financesUrl } from "../../constants/api-constants";
import { EnumMemberResponse } from "../../models/common/enum-member-response.model";
import { CreateFinanceRequest } from "../../models/finances/create-finance-request.model";
import { Observable } from "rxjs";

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

    create(financeRequest: CreateFinanceRequest): Observable<FinanceResponse> {
        return this.httpClient.post<FinanceResponse>(this.apiUrl, financeRequest);
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${id}`)
    }

    getTypes() : Observable<EnumMemberResponse[]> {
        return this.httpClient.get<EnumMemberResponse[]>(`${this.apiUrl}/types`);
    }

    getCategories() : Observable<CategorySimpleResponse[]> {
        return this.httpClient.get<CategorySimpleResponse[]>(`${this.apiUrl}/categories`);
    }


}