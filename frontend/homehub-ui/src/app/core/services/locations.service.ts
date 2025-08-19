import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LocationResponse } from "../../models";
import { locationsUrl } from "../../constants/api-constants";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl = `${this.apiAddress}${locationsUrl}`;

    

    constructor(private httpClient: HttpClient){
    }

    getLocations(): Observable<LocationResponse[]> {
        return this.httpClient.get<LocationResponse[]>(this.apiUrl); 
    }
}