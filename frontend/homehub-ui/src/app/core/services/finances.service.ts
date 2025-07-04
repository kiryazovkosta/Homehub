import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { FinancesListCollectionResponse, FinanceResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiUrl = 'http://localhost:15000/api/finances'

    constructor(private httpClient: HttpClient){}

    getBills(): Observable<FinancesListCollectionResponse> {
        return this.httpClient.get<FinancesListCollectionResponse>(this.apiUrl);
    }

    getBill(id: string) : Observable<FinanceResponse> {
        return this.httpClient.get<FinanceResponse>(`this.apiUrl/${id}`);
    }
}