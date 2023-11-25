import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from 'src/app/services';

@Component({
  selector: 'app-delete-reports',
  templateUrl: './templates/delete-reports.component.html'
})
export class DeleteReportsComponent {
  @Input() id: string='';

  constructor(public activeModal: NgbActiveModal,
    public reportsService: ReportsService) { }

  closedModal() {
    this.activeModal.close();
  }

  delete() {
    this.reportsService.deleteReports(this.id).subscribe(
      (data) => {
        this.reportsService.reportsSubject.next(true);
        this.activeModal.close();
      },
        (error) => {
          console.error('Error al eliminar el obejto', error);
        }
    )
  }
}
