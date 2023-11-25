import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRoomListComponent } from './components/request-room-list/request-room-list.component';
import { EditRequestRoomComponent } from './components/edit-request-room/edit-request-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    RequestRoomListComponent,
    EditRequestRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class RequestRoomModule { }
