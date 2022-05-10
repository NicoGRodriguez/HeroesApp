import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlSegment, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //if (this.authService.auth.id) { return true; } else { return false; }
    return this.authService.verificaAutentication()
      .pipe(
        tap(estaAuth => {
          if (!estaAuth) {
            this.router.navigate(['./auth/login'])
          }
        })
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    //if (this.authService.auth.id) { return true; } else { return false; }
    return this.authService.verificaAutentication().pipe(
      tap(estaAuth => {
        if (!estaAuth) {
          this.router.navigate(['./auth/login'])
        }
      })
    );
  }
}

