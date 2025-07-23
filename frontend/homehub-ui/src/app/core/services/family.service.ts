import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, familyUrl } from "../../constants/api-constants";
import { FamilyWithUsersResponse } from "../../models/families/family-with-users-response.model";

@Injectable({
    providedIn: 'root'
})
export class FamilyService {
    private readonly apiUrl = `${baseUrl}${familyUrl}`;

    constructor(private httpClient: HttpClient){
    }

    getFamiltWithMembers(): Observable<FamilyWithUsersResponse> {
        return this.httpClient.get<FamilyWithUsersResponse>(this.apiUrl);
    }
}