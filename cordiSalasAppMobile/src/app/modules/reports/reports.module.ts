import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateReportsComponent } from './components/create-reports/create-reports.component';
import { DeleteReportsComponent } from './components/delete-reports/delete-reports.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';



@NgModule({
  declarations: [
    ReportsListComponent,
    DeleteReportsComponent,
    CreateReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class ReportsModule { }
