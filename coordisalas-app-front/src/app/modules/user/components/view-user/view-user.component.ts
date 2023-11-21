import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models';

@Component({
  selector: 'app-view-user',
  templateUrl: './templates/view-user.component.html',
})
export class ViewUserComponent {

  @Input() data: User = new User();

  constructor(
    public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
  }

  closedModal() {
    this.activeModal.close();
  }
}
