import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AutoLoginGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        console.log("AutoLoginGuard")
        return this.authService.isAuthenticated
            .pipe(
                tap(authenticated => {
                    if (authenticated){
                        this.router.navigate(['/dashboard']);
                    }
                }),
                map(authenticated => !authenticated)
            );
    }
}