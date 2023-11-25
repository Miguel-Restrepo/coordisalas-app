import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/models';
import { RoomService } from 'src/app/services';

@Component({
  selector: 'app-edit-room',
  templateUrl: './templates/edit-room.component.html',
})
export class EditRoomComponent {

  @Input() room: Room = new Room();
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
      name: ['', [Validators.required]],
      videoBeam: ['', [Validators.required]],
      tv: ['', [Validators.required]],
      available_seats: ['', [Validators.required]],
      functional_computers: ['', [Validators.required]],
      total_computers: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.form.get('name')?.setValue(this.room.name);
    this.form.get('videoBeam')?.setValue(this.room.videoBeam);
    this.form.get('tv')?.setValue(this.room.tv);
    this.form.get('available_seats')?.setValue(this.room.available_seats);
    this.form.get('functional_computers')?.setValue(this.room.functional_computers);
    this.form.get('total_computers')?.setValue(this.room.total_computers);
    this.form.get('description')?.setValue(this.room.description);
  }

  private getModel(): Room {
    return {
      name: this.form.get('name')?.value,
      videoBeam: this.form.get('videoBeam')?.value,
      tv: this.form.get('tv')?.value,
      available_seats: this.form.get('available_seats')?.value,
      functional_computers: this.form.get('functional_computers')?.value,
      total_computers: this.form.get('total_computers')?.value,
      description: this.form.get('description')?.value
    } as Room;
  }

  closedModal() {
    this.activeModal.close();
  }

  edit() {
    if (this.form.invalid) {
      alert('Formulario Invalido');
    } else {
      let model = this.getModel();
      this.roomService.updateRoom(this.room.name.replace(/\s+/g, '_'), model).subscribe(
        (data) => {
          this.roomService.roomSubject.next(true);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error en el inicio de sesión', error);
        }
      )
    }
  }
}
