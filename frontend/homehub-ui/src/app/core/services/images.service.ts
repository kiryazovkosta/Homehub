import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { supabaseUrl } from "../../constants/api-constants";
import { SupabaseResponse } from "../../models";

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImagesServices {
    private readonly apiAddress = environment.apiAddress;

    private readonly apiUrl: string = `${this.apiAddress}${supabaseUrl}`;

    private httpClient: HttpClient = inject(HttpClient);

    uploadImagesToSupabase(file: File): Observable<SupabaseResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', "users");
        return this.httpClient.post<SupabaseResponse>(this.apiUrl, formData);
    }

    uploadProductToSupabase(file: File): Observable<SupabaseResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', "products");
        console.log(formData);
        return this.httpClient.post<SupabaseResponse>(this.apiUrl, formData);
    }
}