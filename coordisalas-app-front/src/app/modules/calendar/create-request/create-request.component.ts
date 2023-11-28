import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestRoom } from 'src/app/models';
import { RequestService } from 'src/app/services';

@Component({
  selector: 'app-create-request',
  templateUrl: './templates/create-request.component.html',
})
export class CreateRequestComponent {
  form: FormGroup = this.fb.group({});
  model: RequestRoom | undefined;
  resolve: ((value?: void | PromiseLike<void> | undefined) => void) | undefined;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public requestRoomService: RequestService
  ) {}

  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.fb.group({
      userId: [{ value: this.model?.user_id, disabled: true }],
      roomId: [{ value: this.model?.room_id, disabled: true }],
      isRecur: [false, [Validators.required]],
      startDate: ['', []],
      endDate: ['', []],
      reason: ['', [Validators.required]],
    });
  }

  closedModal() {
    this.activeModal.close();
  }

  create() {
    //if (this.form.invalid || !this.model) {
    //  alert('Formulario Invalido');
    //  return;
    //}
    this.model = {
      ...this.model,
      is_recurring_event: this.form.get('isRecur')?.value,
      start_date_recurrent: this.form.get('startDate')?.value,
      end_date_recurrent: this.form.get('endDate')?.value,
      reason: this.form.get('reason')?.value,
    };
    this.requestRoomService.createRequestRoom(this.model).subscribe(
      (data) => {
        this.requestRoomService.requestRoomSubject.next(true);
        this.resolve?.();
        this.activeModal.close();
      },
      (error) => {
        console.error('Error al crear', error);
      }
    );
  }
}
