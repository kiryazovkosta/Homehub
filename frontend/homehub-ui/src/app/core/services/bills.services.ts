import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, billsUrl } from "../../constants/api-constants";
import { BillsListCollectionResponse, BillResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiUrl = `${baseUrl}${billsUrl}`;

    constructor(private httpClient: HttpClient){}

    getBills(): Observable<BillsListCollectionResponse> {
        return this.httpClient.get<BillsListCollectionResponse>(this.apiUrl);
    }

    getBill(id: string) : Observable<BillResponse> {
        return this.httpClient.get<BillResponse>(`${this.apiUrl}/${id}`);
    }
}