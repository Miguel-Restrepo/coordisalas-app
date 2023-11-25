import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config';
import { Room } from 'src/app/models';
import { SessionStorageService } from '../storage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  entity = 'room';
  public roomSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: SessionStorageService
    ) { }

  watchChanges(): Observable<boolean> {
    return this.roomSubject.asObservable();
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${ServiceConfig.API_URL}${this.entity}`);
  }

  createRoom(model: Room): Observable<Room> {
    return this.http.post<Room>(
      `${ServiceConfig.API_URL}${this.entity}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  updateRoom(id: string, model: Room): Observable<Room> {
    return this.http.put<Room>(
      `${ServiceConfig.API_URL}${this.entity}/${id}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  deleteRoom(id: string): Observable<Room> {
    return this.http.delete<Room>(
      `${ServiceConfig.API_URL}${this.entity}/${id}/delete`
    );
  }
}
