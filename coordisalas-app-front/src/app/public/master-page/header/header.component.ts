import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { SessionStorageService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './templates/header.component.html',
})
export class HeaderComponent {
  date: string = '';
  public _login = false;
  set login(value: boolean) {
    this._login = value
    if(value){
      this.setData()
    }
  }

  get login() {
    return this._login;
  }
  public name: string = '';

  constructor(
    private sessionStorage: SessionStorageService
  ) {

  }

  ngOnInit() {
    this.internalInit();
  }

  internalInit() {
    const today = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const day = days[today.getDay()];
    this.date = `${day} ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    this.sessionStorage.storageSubject.subscribe((data: string) => {
      this.login = !!data;
    });
    this.login = !!this.sessionStorage.getItem('token');
  }

  setData() {
    let user = this.sessionStorage.getItem('usuario')
    this.name = user.name;
  }
}
