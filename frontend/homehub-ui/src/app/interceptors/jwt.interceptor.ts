import { HttpInterceptorFn } from "@angular/common/http";

import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";

import { AuthService } from "../core/services/auth.service";
import { inject } from "@angular/core";

export const jwtInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const token = authService.jwtToken();

    console.log(token)

    if (token) {
        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(clonedRequest);
    }

    return next(request);
}