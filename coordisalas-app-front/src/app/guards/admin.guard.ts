import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services';
import { RolEnum } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
    private sessionStorage: SessionStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route?.routeConfig?.path === 'reservas' || route?.routeConfig?.path === 'usuarios' || route?.routeConfig?.path === 'reports') {
      let user = this.sessionStorage.getItem('usuario')
      if (user.role === RolEnum.Admin) {
        return true;
      } else {
        this.router.navigate(['/inicio']);
        return false;
      }
    } else {
      return true
    }
  }
}
