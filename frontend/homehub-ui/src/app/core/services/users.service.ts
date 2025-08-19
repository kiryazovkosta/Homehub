import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { userProfileUrl, usersUrl } from "../../constants/api-constants";
import { UserProfileResponse, UpdateUserRequest } from "../../models";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly apiAddress = environment.apiAddress;

    private readonly usersUrl = `${this.apiAddress}${usersUrl}`;
    private readonly profileUrl = `${this.apiAddress}${userProfileUrl}`;

    private httpClient: HttpClient = inject(HttpClient);

    getMyInfo(): Observable<UserProfileResponse> {
        return this.httpClient.get<UserProfileResponse>(this.profileUrl);
    }

    updateMyInfo(request: UpdateUserRequest) : Observable<void> {
        return this.httpClient.put<void>(this.usersUrl, request);
    }
}