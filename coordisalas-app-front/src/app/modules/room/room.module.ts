import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { DeleteRoomComponent } from './components/delete-room/delete-room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { RoomListComponent } from './components/room-list/room-list.component';

@NgModule({
  declarations: [
    RoomListComponent,
    EditRoomComponent,
    DeleteRoomComponent,
    CreateRoomComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
})
export class RoomModule {}
