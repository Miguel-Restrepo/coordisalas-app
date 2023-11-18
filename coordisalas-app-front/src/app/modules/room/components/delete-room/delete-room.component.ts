import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/services';

@Component({
  selector: 'app-delete-room',
  templateUrl: './templates/delete-room.component.html',
})
export class DeleteRoomComponent {
  @Input() id: string='';

  constructor(public activeModal: NgbActiveModal,
    public roomService: RoomService) { }

  closedModal() {
    this.activeModal.close();
  }

  delete() {
    this.roomService.deleteRoom(this.id.replace(/\s+/g, '_')).subscribe(
      (data) => {
        this.roomService.roomSubject.next(true);
        this.activeModal.close();
      },
        (error) => {
          console.error('Error al eliminar el obejto', error);
        }
    )
  }
}
