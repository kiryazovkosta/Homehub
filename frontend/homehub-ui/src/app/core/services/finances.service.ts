import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { FinancesListCollectionResponse, FinanceResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class FinancesService {
    private readonly apiUrl = 'http://localhost:15000/api/finances'

    constructor(private httpClient: HttpClient){}

    getFinances(): Observable<FinancesListCollectionResponse> {
        return this.httpClient.get<FinancesListCollectionResponse>(this.apiUrl);
    }

    getFinance(id: string) : Observable<FinanceResponse> {
        return this.httpClient.get<FinanceResponse>(`${this.apiUrl}/${id}`);
    }
}