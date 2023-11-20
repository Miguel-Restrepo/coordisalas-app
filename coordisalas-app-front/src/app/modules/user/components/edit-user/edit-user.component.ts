import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './templates/edit-user.component.html'
})
export class EditUserComponent {
  form: FormGroup = this.fb.group({});
  showPassword = false;
  @Input() user: User = new User(); 

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public userService: UserService) { }


  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.fb.group({
      document: ['', [Validators.required]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    this.form.get('document')?.setValue(this.user.document);
    this.form.get('name')?.setValue(this.user.name);
    this.form.get('last_name')?.setValue(this.user.last_name);
    this.form.get('role')?.setValue(this.user.role);
  }


  private getModel(): User {
    return {
      document:this.form.get('document')?.value,
      name: this.form.get('name')?.value,
      last_name: this.form.get('last_name')?.value,
      role: this.form.get('role')?.value,
    } as User;
  }

  closedModal() {
    this.activeModal.close();
  }

  update() {
    if (this.form.invalid) {
      alert('Formulario Invalido');
    } else {
      let model = this.getModel();
      this.userService.updateUser(this.user.document, model).subscribe(
        (data) => {
          this.userService.userSubject.next(true);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error en el inicio de sesión', error);
        }
      )
    }
  }
}
