import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutenticationUser } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storageSubject: BehaviorSubject<AutenticationUser> = new BehaviorSubject<AutenticationUser>({

  });

  constructor() {
   }
  

  watchStorageChanges(): Observable<AutenticationUser> {
    return this.storageSubject.asObservable();
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
    if (key === 'user') {
      this.storageSubject.next(value);
    }
  }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
    this.storageSubject.next({});
  }
}
