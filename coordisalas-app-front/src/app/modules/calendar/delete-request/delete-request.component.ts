import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services';

@Component({
  selector: 'app-delete-request',
  templateUrl: './templates/delete-request.component.html',
})
export class DeleteRequestComponent {
  id: string = '';
  title: string = '';
  resolve: ((value?: void | PromiseLike<void> | undefined) => void) | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    public requestRoomService: RequestService
  ) {}

  closedModal() {
    this.activeModal.close();
  }

  delete() {
    this.requestRoomService.deleteRequestRoom(this.id).subscribe(
      (data) => {
        this.requestRoomService.requestRoomSubject.next(true);
        this.resolve?.();
        this.activeModal.close();
      },
      (error) => {
        console.error('Error al eliminar', error);
      }
    );
  }
}
