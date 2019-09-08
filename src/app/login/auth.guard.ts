import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: LoginRoutingModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.checkAuthState(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.canActivate(route, state);
    }

    canLoad(route: Route): Observable<boolean> {
        // route.path estava com bug na época do video - nao pega o caminho inteiro
        // window.location.pathname - as vezes não funciona mas é a solução pro problema acima
        const url = route.path;
        return this.checkAuthState(url)
        .pipe(take(1));
    }

    private checkAuthState(url:string): Observable<boolean> {
        return this.authService.isAuthenticated
        .pipe(
            tap(isLogged => {
                if (!isLogged){
                    this.authService.redirectURL = url;
                    this.router.navigate(['/login']);
                }
            })
        );
    }

}