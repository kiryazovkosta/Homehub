import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, functionalitiesUrl } from "../../constants/api-constants";
import { FunctionalityListResponse, PaginationListResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})

export class FunctionalitiesService {
    private readonly apiUrl = `${baseUrl}${functionalitiesUrl}`

    private httpClient: HttpClient = inject(HttpClient);

    getFunctionalities(): Observable<PaginationListResponse<FunctionalityListResponse>> {
        return this.httpClient.get<PaginationListResponse<FunctionalityListResponse>>(this.apiUrl);
    }
}
