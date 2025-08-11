import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CategorySimpleResponse, FinanceResponse, InventoryListResponse, InventoryResponse, PaginationListResponse } from "../../models";
import { baseUrl, inventoriesUrl } from "../../constants/api-constants";
import { CreateInventoryRequest } from "../../models/inventories/create-inventory-request.model";

export interface InventoriesQueryParameters {
    page: number;
    pageSize: number;
    q: string|null;
    sort: string|null;
}

@Injectable({
    providedIn: 'root'
})
export class InventoriesService {
    private readonly apiUrl: string = `${baseUrl}${inventoriesUrl}`;

    constructor(private httpClient: HttpClient){}

    getInventories(parameters: InventoriesQueryParameters): Observable<PaginationListResponse<InventoryListResponse>> {
        const params: Record<string, string> = {
            page: parameters.page.toString(),
            pageSize: parameters.pageSize.toString()
        };
        
        if (parameters.q) params['q'] = parameters.q;
        if (parameters.sort) params['sort'] = parameters.sort;
        
        const queryParams = new HttpParams({fromObject: params});
        return this.httpClient.get<PaginationListResponse<InventoryListResponse>>(this.apiUrl, {params: queryParams});
    }

    getInventory(id: string) : Observable<InventoryResponse> {
        return this.httpClient.get<InventoryResponse>(`${this.apiUrl}/${id}`);
    }

    getCategories() : Observable<CategorySimpleResponse[]> {
        return this.httpClient.get<CategorySimpleResponse[]>(`${this.apiUrl}/categories`);
    }

    create(createInvebtoryRequest: CreateInventoryRequest): Observable<InventoryResponse> {
        return this.httpClient.post<InventoryResponse>(this.apiUrl, createInvebtoryRequest);
    }

    delete(id: string) : Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
    }
}