import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { 
    CategorySimpleResponse, 
    InventoryListResponse, 
    InventoryResponse, 
    PaginationListResponse, 
    InventoryRequest 
} from "../../models";
import { 
    inventoriesUrl,
    inventoryCategoriesUrl
} from "../../constants/api-constants";

import { environment } from '../../../environments/environment';

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
    private readonly apiAddress = environment.apiAddress;

    private readonly inventoriesUrl: string = `${this.apiAddress}${inventoriesUrl}`;
    private readonly categoriesUrl: string = `${this.apiAddress}${inventoryCategoriesUrl}`;

    constructor(private httpClient: HttpClient){}

    getInventories(parameters: InventoriesQueryParameters): Observable<PaginationListResponse<InventoryListResponse>> {
        const params: Record<string, string> = {
            page: parameters.page.toString(),
            pageSize: parameters.pageSize.toString()
        };
        
        if (parameters.q) params['q'] = parameters.q;
        if (parameters.sort) params['sort'] = parameters.sort;
        
        const queryParams = new HttpParams({fromObject: params});
        return this.httpClient.get<PaginationListResponse<InventoryListResponse>>(this.inventoriesUrl, {params: queryParams});
    }

    getInventory(id: string) : Observable<InventoryResponse> {
        return this.httpClient.get<InventoryResponse>(`${this.inventoriesUrl}/${id}`);
    }

    getCategories() : Observable<CategorySimpleResponse[]> {
        return this.httpClient.get<CategorySimpleResponse[]>(this.categoriesUrl);
    }

    create(inventoryRequest: InventoryRequest): Observable<InventoryResponse> {
        return this.httpClient.post<InventoryResponse>(this.inventoriesUrl, inventoryRequest);
    }

    update(id: string, inventoryRequest: InventoryRequest): Observable<void> {
        console.log(inventoryRequest);

        return this.httpClient.put<void>(`${this.inventoriesUrl}/${id}`, inventoryRequest);
    }

    delete(id: string) : Observable<void> {
        return this.httpClient.delete<void>(`${this.inventoriesUrl}/${id}`);
    }
}