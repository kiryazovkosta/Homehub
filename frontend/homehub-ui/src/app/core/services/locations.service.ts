import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LocationResponse } from "../../models";
import { baseUrl, locationsUrl } from "../../constants/api-constants";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiUrl = baseUrl + locationsUrl;

    constructor(private httpClient: HttpClient){
    }

    getLocations(): Observable<LocationResponse[]> {
        return this.httpClient.get<LocationResponse[]>(this.apiUrl); 
    }
}