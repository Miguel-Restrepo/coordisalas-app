import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/session-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config';
import { RequestRoom } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  entity = 'request-room';
  public requestRoomSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: SessionStorageService
  ) {}

  watchChanges(): Observable<boolean> {
    return this.requestRoomSubject.asObservable();
  }

  createRequestRoom(model: RequestRoom): Observable<RequestRoom> {
    return this.http.post<RequestRoom>(
      `${ServiceConfig.API_URL}${this.entity}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  updateRequestRoom(id: string, model: RequestRoom): Observable<RequestRoom> {
    return this.http.put<RequestRoom>(
      `${ServiceConfig.API_URL}${this.entity}/${id}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  deleteRequestRoom(id: string): Observable<RequestRoom> {
    return this.http.delete<RequestRoom>(
      `${ServiceConfig.API_URL}${this.entity}/${id}/delete`
    );
  }
}
