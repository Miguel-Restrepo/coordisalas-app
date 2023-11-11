import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private sessionStorage: SessionStorageService) { }

  canActivate(): boolean {
    if (this.sessionStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }
  }
}