import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/session-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reports } from 'src/app/models';
import { ServiceConfig } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  entity = 'reports';
  public reportsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: SessionStorageService
    ) { }

  watchChanges(): Observable<boolean> {
    return this.reportsSubject.asObservable();
  }

  getReportss(): Observable<Reports[]> {
    return this.http.get<Reports[]>(`${ServiceConfig.API_URL}${this.entity}`);
  }

  createReports(model: Reports): Observable<Reports> {
    return this.http.post<Reports>(
      `${ServiceConfig.API_URL}${this.entity}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  updateReports(id: string, model: Reports): Observable<Reports> {
    return this.http.put<Reports>(
      `${ServiceConfig.API_URL}${this.entity}/${id}`,
      model,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getItem('token')}`,
        }),
      }
    );
  }

  deleteReports(id: string): Observable<Reports> {
    return this.http.delete<Reports>(
      `${ServiceConfig.API_URL}${this.entity}/${id}/delete`
    );
  }
}
