import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-create-user',
  templateUrl: './templates/create-user.component.html'
})
export class CreateUserComponent {
  form: FormGroup = this.fb.group({});
  showPassword = false;

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
      document: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(/^\d+$/)
      ]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password:  [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],
    });
  }

  public fieldValid(fieldName: string) {
    return (this.form.get(fieldName)?.invalid && (this.form.get(fieldName)?.dirty || this.form.get(fieldName)?.touched));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }

  private getModel(): User {
    return {
      document:this.form.get('document')?.value,
      name: this.form.get('name')?.value,
      last_name: this.form.get('last_name')?.value,
      role: this.form.get('role')?.value,
      password: this.form.get('password')?.value,
    } as User;
  }

  closedModal() {
    this.activeModal.close();
  }

  create() {
    if (this.form.invalid) {
      alert('Formulario Invalido');
    } else {
      let model = this.getModel();
      this.userService.createUser(model).subscribe(
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
