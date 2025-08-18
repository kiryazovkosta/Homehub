import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, familiesUrl, familyUrl } from "../../constants/api-constants";
import { FamilyWithUsersResponse, FamiliesResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class FamilyService {
    private readonly apiUrl = `${baseUrl}${familyUrl}`;
    private readonly aipUrlList = `${baseUrl}${familiesUrl}`;

    constructor(private httpClient: HttpClient){
    }

    getFamilies(): Observable<FamiliesResponse> {
        return this.httpClient.get<FamiliesResponse>(this.aipUrlList)
    }

    getFamilyWithMembers(): Observable<FamilyWithUsersResponse> {
        return this.httpClient.get<FamilyWithUsersResponse>(this.apiUrl);
    }
}