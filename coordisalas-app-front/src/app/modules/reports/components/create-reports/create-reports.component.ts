import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reports } from 'src/app/models';
import { ReportsService, SessionStorageService } from 'src/app/services';

@Component({
  selector: 'app-create-reports',
  templateUrl: './templates/create-reports.component.html',
})
export class CreateReportsComponent {
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public reportsService: ReportsService,
    private sessionStorage: SessionStorageService) { }


  ngOnInit(): void {
    this.internalInit();
  }

  internalInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.fb.group({
      electrical_damage: ['', [Validators.required ]],
      flooding: ['', [Validators.required ]],
      description: ['', [Validators.required ]],
      damaged_PC: ['', [Validators.required ]],
    });
  }

  private getModel(): Reports {
    let user = this.sessionStorage.getItem('usuario')
    return {
      description: this.form.get('description')?.value,
      electrical_damage: this.form.get('electrical_damage')?.value,
      flooding: this.form.get('flooding')?.value,
      damaged_PC: this.form.get('damaged_PC')?.value,
      user_id: user.document
    } as Reports;
  }

  closedModal() {
    this.activeModal.close();
  }

  create() {
    if (this.form.invalid) {
      alert('Formulario Invalido');
    } else {
      let model = this.getModel();
      this.reportsService.createReports(model).subscribe(
        (data) => {
          this.reportsService.reportsSubject.next(true);
          this.activeModal.close();
        },
          (error) => {
            console.error('Error en el inicio de sesión', error);
          }
      )}
  }
}
