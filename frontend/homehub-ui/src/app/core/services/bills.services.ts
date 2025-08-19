import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { billsUrl } from "../../constants/api-constants";
import { BillsListCollectionResponse, BillResponse } from "../../models";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BillsService {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl = `${this.apiAddress}${billsUrl}`;

    constructor(private httpClient: HttpClient){}

    getBills(): Observable<BillsListCollectionResponse> {
        return this.httpClient.get<BillsListCollectionResponse>(this.apiUrl);
    }

    getBill(id: string) : Observable<BillResponse> {
        return this.httpClient.get<BillResponse>(`${this.apiUrl}/${id}`);
    }
}