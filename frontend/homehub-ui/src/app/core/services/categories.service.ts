import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CategoryResponse } from "../../models";
import { categoriesUrl } from "../../constants/api-constants";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl = `${this.apiAddress}${categoriesUrl}`;

    constructor(private httpClient: HttpClient){
    }

    getCategories(): Observable<CategoryResponse[]> {
        return this.httpClient.get<CategoryResponse[]>(this.apiUrl);
    }
}