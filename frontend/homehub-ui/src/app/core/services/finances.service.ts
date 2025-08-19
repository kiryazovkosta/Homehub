import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { 
    FinanceResponse, 
    PaginationListResponse, 
    FinanceListResponse, 
    CategorySimpleResponse,
    EnumMemberResponse, 
    CreateFinanceRequest, 
    UpdateFinanceRequest 
} from "../../models";
import { 
    financesUrl,
    financeTypesUrl,
    financeCategoriesUrl,
} from "../../constants/api-constants";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FinancesService {
    private readonly apiAddress = environment.apiAddress;

    private readonly financesUrl = `${this.apiAddress}${financesUrl}`;
    private readonly typesUrl = `${this.apiAddress}${financeTypesUrl}`;
    private readonly categoriesUrl = `${this.apiAddress}${financeCategoriesUrl}`;

    constructor(private httpClient: HttpClient){}

    getFinances(pagination: { page:number, pageSize: number }): Observable<PaginationListResponse<FinanceListResponse>> {
        return this.httpClient.get<PaginationListResponse<FinanceListResponse>>(this.financesUrl, { params: pagination });
    }

    getFinance(id: string) : Observable<FinanceResponse> {
        return this.httpClient.get<FinanceResponse>(`${this.financesUrl}/${id}`);
    }

    create(financeRequest: CreateFinanceRequest): Observable<FinanceResponse> {
        return this.httpClient.post<FinanceResponse>(this.financesUrl, financeRequest);
    }

    update(financeRequest: UpdateFinanceRequest): Observable<void> {
        return this.httpClient.put<void>(`${this.financesUrl}/${financeRequest.id}`, financeRequest);
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.financesUrl}/${id}`)
    }

    getTypes() : Observable<EnumMemberResponse[]> {
        return this.httpClient.get<EnumMemberResponse[]>(this.typesUrl);
    }

    getCategories() : Observable<CategorySimpleResponse[]> {
        return this.httpClient.get<CategorySimpleResponse[]>(this.categoriesUrl);
    }
}