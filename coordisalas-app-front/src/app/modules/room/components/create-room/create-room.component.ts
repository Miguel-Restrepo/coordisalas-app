import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/models';
import { RoomService } from 'src/app/services';

@Component({
  selector: 'app-create-room',
  templateUrl: './templates/create-room.component.html',
})
export class CreateRoomComponent {
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public roomService: RoomService) { }


  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required ]],
    });
  }

  private getModel(): Room {
    return {
      name: this.form.get('name')?.value,
    } as Room;
  }

  closedModal() {
    this.activeModal.close();
  }

  create() {
    if (this.form.invalid) {
      alert('Formulario Invalido');
    } else {
      let model = this.getModel();
      this.roomService.createRoom(model).subscribe(
        (data) => {
          this.roomService.roomSubject.next(true);
          this.activeModal.close();
        },
          (error) => {
            console.error('Error en el inicio de sesión', error);
          }
      )}
  }
}
