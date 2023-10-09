
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config';
import { AutenticationUser, LoginCredentials } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient
  ) { }

  login(credential: LoginCredentials): Observable<AutenticationUser> {
    return this.http.post<AutenticationUser>(`${ServiceConfig.API_URL}login`, credential, {
      headers: new HttpHeaders()
    })
  }
}
