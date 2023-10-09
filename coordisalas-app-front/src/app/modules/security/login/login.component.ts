import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticationUser, LoginCredentials } from 'src/app/models';
import { SecurityService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './templates/login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService
  ) {

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

  public fieldValid(fieldName: string) {
    return (this.loginForm.get(fieldName)?.invalid && (this.loginForm.get(fieldName)?.dirty || this.loginForm.get(fieldName)?.touched));
  }

  public login() {
    if (this.loginForm.invalid) {
      alert('Formulario Invalido');
    } else {
      let credentials = this.getLoginCredentials();
      this.securityService.login(credentials).subscribe(
        (data) => {
          console.log('Inicio de sesión exitoso', data);
          this.router.navigate(["/inicio"]);
        },
          (error) => {
            console.error('Error en el inicio de sesión', error);
          }
      )}
      /* this.service.ingresoUsuarios(credentials).subscribe((data) => {
         alert('Bienvenido');
         let res = this.service.guardarSesion(data);
         this.router.navigate(["/inicio"]);
       }, err => {
         alert('Usuario o contraseña NO validos');
       }
       );*/
    
  }

  private getLoginCredentials(): LoginCredentials {
    return {
      document: this.loginForm.get('user')?.value,
      password: this.loginForm.get('password')?.value
    } as LoginCredentials;
  }
}
