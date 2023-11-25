import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolEnum } from 'src/app/enums';
import { Reports } from 'src/app/models';
import { ReportsService, SessionStorageService } from 'src/app/services';
import { DeleteReportsComponent } from '../delete-reports/delete-reports.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './templates/reports-list.component.html',
})
export class ReportsListComponent {
  reports: Reports[] = [];
  filteredReportss: Reports[] = [];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;
  isAdmin: boolean = false;

  constructor(
    private reportsService: ReportsService,
    private modalService: NgbModal,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.internatInit();
  }

  internatInit() {
    this.getReportss();
    this.reportsService.reportsSubject.subscribe((data: boolean) => {
      this.getReportss();
    });
    let user = this.sessionStorage.getItem('usuario')
    this.isAdmin = user.role === RolEnum.Admin;
  }

  getReportss() {
    this.reportsService.getReportss().subscribe(
      (data: Reports[]) => {
        this.reports = data;
        this.filteredReportss = data;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  applyFilter() {
    this.filteredReportss = this.reports.filter((reports) =>
      reports.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  delete(id: any) {
    const modalRef = this.modalService.open(DeleteReportsComponent);
    modalRef.componentInstance.id = id;
  }
}
