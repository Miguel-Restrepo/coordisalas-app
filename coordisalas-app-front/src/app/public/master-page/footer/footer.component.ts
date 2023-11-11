import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/services';

@Component({
  selector: 'app-footer',
  templateUrl: './templates/footer.component.html',
})
export class FooterComponent {

  public login = false;
  constructor(
    private sessionStorage: SessionStorageService
  ){
  }

  ngOnInit() {
    this.internalInit();
  }

  internalInit() {
    this.login = !!this.sessionStorage.getItem('token');
  }
}
