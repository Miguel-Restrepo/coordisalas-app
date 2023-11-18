import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { T } from '@fullcalendar/core/internal-common';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getCalendarByRoom(room: string): Observable<any> {
    return this.http.get<any>(
      `${ServiceConfig.API_URL}request-room/approve/room/${room}`
    );
  }

  getCalendarByUser(user: string): Observable<any> {
    return this.http.get<any>(
      `${ServiceConfig.API_URL}request-room/approve/user/${user}`
    );
  }
}
