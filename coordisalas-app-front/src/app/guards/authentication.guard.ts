import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private sessionStorage: SessionStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (route?.routeConfig?.path === 'inicio-sesion') {
        if (this.sessionStorage.getItem('token')) {
          this.router.navigate(['/inicio']);
          return false;
        } else {
          return true;
        }
      } else {
        if (this.sessionStorage.getItem('token')) {
          return true;
        } else {
          this.router.navigate(['/iniciar-sesion']);
          return false;
        }
      }
  }
  
}
