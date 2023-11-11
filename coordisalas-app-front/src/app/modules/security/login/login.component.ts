import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from 'src/app/models';
import { SecurityService, SessionStorageService } from 'src/app/services';

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
    private securityService: SecurityService,
    private sessionStorage: SessionStorageService
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
          this.sessionStorage.setItem('usuario', data.user);
          this.sessionStorage.setItem('token', data.token);
          this.router.navigate(["/inicio"]);
        },
          (error) => {
            console.error('Error en el inicio de sesión', error);
          }
      )}
    
  }

  private getLoginCredentials(): LoginCredentials {
    return {
      document: this.loginForm.get('user')?.value,
      password: this.loginForm.get('password')?.value
    } as LoginCredentials;
  }
}
