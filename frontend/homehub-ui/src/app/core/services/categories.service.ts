import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CategoryResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiUrl = 'http://localhost:15000/api/categories'

    constructor(private httpClient: HttpClient){
    }

    getLocations(): Observable<CategoryResponse[]> {
        return this.httpClient.get<CategoryResponse[]>(this.apiUrl);
    }
}