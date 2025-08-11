import { inject, Injectable } from "@angular/core";
import { baseUrl, supabaseUrl } from "../../constants/api-constants";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SupabaseResponse } from "../../models/common/supabase-response.model";


@Injectable({
    providedIn: 'root'
})
export class ImagesServices {
    private readonly apiUrl: string = `${baseUrl}${supabaseUrl}`;

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