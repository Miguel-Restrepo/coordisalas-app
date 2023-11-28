import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { DeleteRequestComponent } from './delete-request/delete-request.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    CalendarComponent,
    CreateRequestComponent,
    DeleteRequestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
})
export class CalendarModule {}
