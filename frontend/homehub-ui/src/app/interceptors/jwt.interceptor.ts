import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { HttpHandlerFn } from "@angular/common/http";
import { AuthService } from "../core/services/auth.service";
import { inject } from "@angular/core";
import { switchMap, catchError } from 'rxjs/operators';

export const jwtInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    
    if (request.url.includes('/refresh') || request.url.includes('refresh')) {
        console.log('Skipping interceptor for refresh request');
        return next(request);
    }
    
    const token = authService.jwtToken();

    if (token && authService.validateToken(token)) {
        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(clonedRequest);
    } 
    
    const refreshToken = authService.refreshToken();
    if (refreshToken) {
        return authService.refresh(refreshToken).pipe(
            switchMap(result => {
                if (result !== null) {
                    const clonedRequest = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${result}`,
                        },
                    });
                    return next(clonedRequest);
                }
                return next(request);
            }),
            catchError((error) => {
                console.log('Refresh failed with error:', error);
                return next(request);
            })
        );
    }
    
    return next(request);
}