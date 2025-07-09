import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { FinancesListCollectionResponse, FinanceResponse } from "../../models";
import { baseUrl, financesUrl } from "../../constants/api-constants";

@Injectable({
    providedIn: 'root'
})
export class FinancesService {
    private readonly apiUrl = `${baseUrl}${financesUrl}`;

    constructor(private httpClient: HttpClient){}

    getFinances(): Observable<FinancesListCollectionResponse> {
        return this.httpClient.get<FinancesListCollectionResponse>(this.apiUrl);
    }

    getFinance(id: string) : Observable<FinanceResponse> {
        return this.httpClient.get<FinanceResponse>(`${this.apiUrl}/${id}`);
    }
}