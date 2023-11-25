import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateRequestEnum } from 'src/app/enums';
import { RequestRoom } from 'src/app/models';
import { RequestService } from 'src/app/services';

@Component({
  selector: 'app-edit-request-room',
  templateUrl: './templates/edit-request-room.component.html'
})
export class EditRequestRoomComponent {

  @Input() requestRomm: RequestRoom = new RequestRoom();
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private roomService: RequestService) { }


  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.fb.group({
      reason_rejected: ['', [Validators.required]],
    });
  }

  private getModel(): RequestRoom {
    return {
      id: this.requestRomm.id,
      reason_rejected: this.form.get('reason_rejected')?.value,
      status: StateRequestEnum.Rejected
    } as RequestRoom;
  }

  closedModal() {
    this.activeModal.close();
  }

  edit() {
    if (this.form.invalid) {
      alert('Formulario Invalido');
    } else {
      if (this.requestRomm.id)
        this.roomService.updateRequestRoom(this.requestRomm.id, this.getModel()).subscribe(
          (data: RequestRoom) => {
            this.roomService.requestRoomSubject.next(true);
            this.activeModal.close();
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }
}
