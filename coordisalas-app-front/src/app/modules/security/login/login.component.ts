import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticationUser, LoginCredentials } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './templates/login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
    this.initForm();
  }

  protected initForm() {
    this.loginForm = this.fb.group({
      user: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(12), 
        Validators.pattern(/^\d+$/)
      ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ]
    });
  }

  public fieldValid(fieldName: string){
    return (this.loginForm.get(fieldName)?.invalid && (this.loginForm.get(fieldName)?.dirty || this.loginForm.get(fieldName)?.touched));
  }

  public login() {
    if (this.loginForm.invalid) {
      alert('Formulario Invalido');
    } else {
      let credentials = this.getLoginCredentials();
     /* this.service.ingresoUsuarios(credentials).subscribe((data) => {
        alert('Bienvenido');
        let res = this.service.guardarSesion(data);
        this.router.navigate(["/inicio"]);
      }, err => {
        alert('Usuario o contraseña NO validos');
      }
      );*/
      console.log(credentials);
    }
  }

  private getLoginCredentials(): LoginCredentials {
    return {
      user: this.loginForm.get('user')?.value,
      password: this.loginForm.get('password')?.value
    } as LoginCredentials;
  }
}
