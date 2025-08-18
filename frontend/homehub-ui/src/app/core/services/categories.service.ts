import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CategoryResponse } from "../../models";
import { baseUrl, categoriesUrl } from "../../constants/api-constants";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly apiUrl = `${baseUrl}${categoriesUrl}`;

    constructor(private httpClient: HttpClient){
    }

    getLocations(): Observable<CategoryResponse[]> {
        return this.httpClient.get<CategoryResponse[]>(this.apiUrl);
    }
}