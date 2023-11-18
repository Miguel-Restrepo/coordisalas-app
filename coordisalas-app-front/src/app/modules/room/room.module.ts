import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [RoomListComponent],
  imports: [CommonModule, FormsModule, NgbModule, FullCalendarModule],
})
export class RoomModule {}
