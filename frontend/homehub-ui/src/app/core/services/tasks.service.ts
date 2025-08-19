import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { tasksUrl } from "../../constants/api-constants";
import { TasksListCollectionResponse, TaskResponse } from "../../models";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl: string = `${this.apiAddress}${tasksUrl}`;

    constructor(private httpClient: HttpClient){}

    getTasks(): Observable<TasksListCollectionResponse> {
        return this.httpClient.get<TasksListCollectionResponse>(this.apiUrl);
    }

    getTask(id: string) : Observable<TaskResponse> {
        return this.httpClient.get<TaskResponse>(`${this.apiUrl}/${id}`);
    }
}