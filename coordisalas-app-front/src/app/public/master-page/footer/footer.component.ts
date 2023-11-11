import { Component } from '@angular/core';
import { AutenticationUser, User } from 'src/app/models';
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
    this.sessionStorage.storageSubject.subscribe((data: string) => {
      this.login = !!data;
    });
    this.login = !!this.sessionStorage.getItem('token'); 
  }
}
