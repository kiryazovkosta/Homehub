import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    } else {
        return router.navigate(['/login']);
    }
}