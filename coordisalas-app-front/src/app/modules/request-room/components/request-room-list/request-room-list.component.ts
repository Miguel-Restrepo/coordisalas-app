import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateRequestEnum } from 'src/app/enums';
import { RequestRoom } from 'src/app/models';
import { RequestService } from 'src/app/services';
import { EditRequestRoomComponent } from '../edit-request-room/edit-request-room.component';

@Component({
  selector: 'app-request-room-list',
  templateUrl: './templates/request-room-list.component.html'
})
export class RequestRoomListComponent {
  request: RequestRoom[] = [];
  filteredRequest: RequestRoom[] = [];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  constructor(
    private roomService: RequestService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.internatInit();
  }

  internatInit() {
    this.getRooms();
    this.roomService.requestRoomSubject.subscribe((data: boolean) => {
      this.getRooms();
    });
  }

  getRooms() {
    this.roomService.getRequestRoomsByState(StateRequestEnum.Pending).subscribe(
      (data: RequestRoom[]) => {
        this.request = data;
        this.filteredRequest = data;
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
    this.filteredRequest = this.request.filter((room) =>
      room.users?.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  accept(element: RequestRoom) {
    element.status = StateRequestEnum.Approved;
    if (element.id)
      this.roomService.updateRequestRoom(element.id, {
        id: element.id,
        status: element.status
      }).subscribe(
        (data: RequestRoom) => {
          this.roomService.requestRoomSubject.next(true);
        },
        (error) => {
          console.error('Error:', error);
        }
      );

  }

  rejected(element: RequestRoom) {
    const modalRef = this.modalService.open(EditRequestRoomComponent);
    modalRef.componentInstance.requestRomm = element;
  }
}
