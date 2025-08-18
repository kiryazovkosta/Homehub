import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseUrl, userProfileUrl, usersUrl } from "../../constants/api-constants";
import { UserProfileResponse, UpdateUserRequest } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly apiUrl = `${baseUrl}${userProfileUrl}`;

    private httpClient: HttpClient = inject(HttpClient);

    getMyInfo(): Observable<UserProfileResponse> {
        return this.httpClient.get<UserProfileResponse>(`${baseUrl}${userProfileUrl}`);
    }

    updateMyInfo(request: UpdateUserRequest) : Observable<void> {
        return this.httpClient.put<void>(`${baseUrl}${usersUrl}`, request);
    }
}