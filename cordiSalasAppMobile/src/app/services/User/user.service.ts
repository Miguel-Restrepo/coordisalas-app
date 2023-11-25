import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config';
import { User } from 'src/app/models';
import { SessionStorageService } from '../storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  entity = 'user';
  public userSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: SessionStorageService
    ) { }

  watchChanges(): Observable<boolean> {
    return this.userSubject.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ServiceConfig.API_URL}${this.entity}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storageService.getItem('token')}`,
      }),
    });
  }

  createUser(model: User): Observable<User> {
    return this.http.post<User>(
      `${ServiceConfig.API_URL}${this.entity}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  updateUser(id: string, model: User): Observable<User> {
    return this.http.put<User>(
      `${ServiceConfig.API_URL}${this.entity}/${id}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(
      `${ServiceConfig.API_URL}${this.entity}/${id}/delete`
    );
  }
}
