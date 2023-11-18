import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { DeleteRoomComponent } from './components/delete-room/delete-room.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';

@NgModule({
  declarations: [RoomListComponent, EditRoomComponent, DeleteRoomComponent, CreateRoomComponent],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule],
})
export class RoomModule {}
