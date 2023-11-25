import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/models';
import { RoomService, SessionStorageService } from 'src/app/services';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { DeleteRoomComponent } from '../delete-room/delete-room.component';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { RolEnum } from 'src/app/enums';

@Component({
  selector: 'app-room-list',
  templateUrl: './templates/room-list.component.html',
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;
  isAdmin: boolean = false;

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.internatInit();
  }

  internatInit() {
    this.getRooms();
    this.roomService.roomSubject.subscribe((data: boolean) => {
      this.getRooms();
    });
    let user = this.sessionStorage.getItem('usuario')
    this.isAdmin = user.role === RolEnum.Admin;
  }

  getRooms() {
    this.roomService.getRooms().subscribe(
      (data: Room[]) => {
        this.rooms = data;
        this.filteredRooms = data;
      },
      (error) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  applyFilter() {
    this.filteredRooms = this.rooms.filter((room) =>
      room.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  create() {
    this.modalService.open(CreateRoomComponent, { size: 'lg' });
  }

  edit(room: Room) {
    const modalRef = this.modalService.open(EditRoomComponent);
    modalRef.componentInstance.room = room;
  }

  delete(id: any) {
    const modalRef = this.modalService.open(DeleteRoomComponent);
    modalRef.componentInstance.id = id;
  }
}
