import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-delete-user',
  templateUrl: './templates/delete-user.component.html'
})
export class DeleteUserComponent {
  @Input() id: string = '';

  constructor(public activeModal: NgbActiveModal,
    public userService: UserService) { }

  closedModal() {
    this.activeModal.close();
  }

  delete() {
    this.userService.deleteUser(this.id.replace(/\s+/g, '_')).subscribe(
      (data) => {
        this.userService.userSubject.next(true);
        this.activeModal.close();
      },
      (error) => {
        console.error('Error al eliminar el obejto', error);
      }
    )
  }
}
