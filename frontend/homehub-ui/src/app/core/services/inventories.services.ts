import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { InventoriesListCollectionResponse, InventoryResponse } from "../../models";
import { baseUrl, inventoriesUrl } from "../../constants/api-constants";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiUrl: string = `${baseUrl}${inventoriesUrl}`;

    constructor(private httpClient: HttpClient){}

    getBills(): Observable<InventoriesListCollectionResponse> {
        return this.httpClient.get<InventoriesListCollectionResponse>(this.apiUrl);
    }

    getBill(id: string) : Observable<InventoryResponse> {
        return this.httpClient.get<InventoryResponse>(`${this.apiUrl}/${id}`);
    }
}