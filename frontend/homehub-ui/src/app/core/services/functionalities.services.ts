import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { functionalitiesUrl } from "../../constants/api-constants";
import { FunctionalityListResponse, PaginationListResponse } from "../../models";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FunctionalitiesService {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl = `${this.apiAddress}${functionalitiesUrl}`

    private httpClient: HttpClient = inject(HttpClient);

    getFunctionalities(): Observable<PaginationListResponse<FunctionalityListResponse>> {
        return this.httpClient.get<PaginationListResponse<FunctionalityListResponse>>(this.apiUrl);
    }
}
