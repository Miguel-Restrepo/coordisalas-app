import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './templates/header.component.html',
})
export class HeaderComponent {
  date: string = '';

  constructor(
    private sessionStorage: SessionStorageService
  ){

  }

  ngOnInit() {
    this.internalInit();
  }

  internalInit() {
    const today = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const day = days[today.getDay()];
    this.date = `${day} ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    if (this.sessionStorage.getItem('token')) {

    }
  }
}
