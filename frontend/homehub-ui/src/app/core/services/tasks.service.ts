import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TasksListCollectionResponse, TaskResponse } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private readonly apiUrl: string = 'http://localhost:15000/api/tasks';

    constructor(private httpClient: HttpClient){}

    getTasks(): Observable<TasksListCollectionResponse> {
        return this.httpClient.get<TasksListCollectionResponse>(this.apiUrl);
    }

    getTask(id: string) : Observable<TaskResponse> {
        return this.httpClient.get<TaskResponse>(`this.apiUrl/${id}`);
    }
}