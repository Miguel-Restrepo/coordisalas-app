import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/models';
import { RoomService } from 'src/app/services';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getRooms();
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

  open(content: any) {
    this.modalService.open(content);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  applyFilter() {
    this.filteredRooms = this.rooms.filter((room) =>
      room.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
