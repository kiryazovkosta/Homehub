import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Location } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiUrl = 'http://localhost:15000/api/locations'

    constructor(private httpClient: HttpClient){
    }

    getLocations(): Observable<Location[]> {
        return this.httpClient.get<Location[]>(this.apiUrl);
    }
}