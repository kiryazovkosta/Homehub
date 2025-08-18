import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, financesUrl } from "../../constants/api-constants";
import { 
    FinanceResponse, 
    PaginationListResponse, 
    FinanceListResponse, 
    CategorySimpleResponse,
    EnumMemberResponse, 
    CreateFinanceRequest, 
    UpdateFinanceRequest 
} from "../../models";

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

    update(financeRequest: UpdateFinanceRequest): Observable<void> {
        return this.httpClient.put<void>(`${this.apiUrl}/${financeRequest.id}`, financeRequest);
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