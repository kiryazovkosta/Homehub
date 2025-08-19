import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { familiesUrl, familyUrl } from "../../constants/api-constants";
import { FamilyWithUsersResponse, FamiliesResponse } from "../../models";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FamilyService {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl = `${this.apiAddress}${familyUrl}`;
    private readonly aipUrlList = `${this.apiAddress}${familiesUrl}`;

    constructor(private httpClient: HttpClient){
    }

    getFamilies(): Observable<FamiliesResponse> {
        console.log(this.aipUrlList)
        return this.httpClient.get<FamiliesResponse>(this.aipUrlList)
    }

    getFamilyWithMembers(): Observable<FamilyWithUsersResponse> {
        console.log(this.apiUrl);
        return this.httpClient.get<FamilyWithUsersResponse>(this.apiUrl);
    }
}