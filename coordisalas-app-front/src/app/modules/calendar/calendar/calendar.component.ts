import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarService } from 'src/app/services/Calendar/calendar.service';
import { ServiceConfig } from 'src/app/config';
import {
  RoomService,
  SessionStorageService,
  UserService,
} from 'src/app/services';
import { RequestService } from 'src/app/services';
import { RequestRoom, Room, User } from 'src/app/models';
import { RolEnum, StateRequestEnum } from 'src/app/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { DeleteRequestComponent } from '../delete-request/delete-request.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  private user: any;
  private userId: string = '';
  selectedFilterType: string = '';
  selectedRoom: string = '';
  selectedUser: string = '';
  calendarVisible = false;
  url: string = `${ServiceConfig.API_URL}request-room/approve/room/Sala_A`;
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    timeZone: 'America/New_York',
    initialView: 'timeGridWeek',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    unselectCancel: '.request-form',
    dayMaxEvents: true,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      meridiem: 'short',
    },
    displayEventEnd: true,
    stickyHeaderDates: true,
    eventStartEditable: false,
    //allDaySlot: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    /* you can update a remote database when these fire:
    eventsSet: this.handleEvents.bind(this),
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  rooms: Room[] = [];
  users: User[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private sessionStorage: SessionStorageService,
    private modalService: NgbModal,
    public requestRoomService: RequestService,
    public roomService: RoomService,
    public userService: UserService
  ) {}

  getUserId() {
    this.user = this.sessionStorage.getItem('usuario');
    this.userId = this.user.document;
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    let model = {
      date: selectInfo.start,
      start_date: selectInfo.start,
      end_date: selectInfo.end,
      room_id: this.selectedRoom,
      user_id: this.userId,
      status:
        this.user.role === RolEnum.Admin
          ? StateRequestEnum.Approved
          : StateRequestEnum.Pending,
    } as RequestRoom;
    this.create(model).then(() => {
      calendarApi.unselect();
      calendarApi.refetchEvents();
      //calendarApi.changeView(calendarApi.view.type);
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    const calendarApi = clickInfo.view.calendar;
    this.delete(clickInfo.event.id, clickInfo.event.title).then(() => {
      calendarApi.unselect();
      calendarApi.refetchEvents();
      //calendarApi.changeView(calendarApi.view.type);
    });
  }

  ngOnInit() {
    this.getUserId();
    this.loadEvents();
    this.getRooms();
    this.getUsers();
  }

  private loadEvents() {
    this.calendarOptions.events = {
      url: this.url,
      method: 'GET',
      failure: () => {
        alert('There was an error while fetching events!');
      },
      //color: 'blue',
      //textColor: 'black',
    };
  }

  onSelectFilter(event: any) {
    this.selectedFilterType = event.target.value;
    this.loadEvents();
  }

  onSelectRoom(event: any) {
    this.selectedRoom = event.target.value;
    this.filterByRoom(this.selectedRoom);
    this.calendarVisible = true;
  }

  filterByRoom(room: string) {
    this.url = `${ServiceConfig.API_URL}request-room/approve/room/${room}`;
    this.loadEvents();
  }

  onSelectUser(event: any) {
    const selectedUser = event.target.value;
    this.filterByUser(selectedUser);
    this.calendarVisible = true;
  }

  filterByUser(user: string) {
    this.url = `${ServiceConfig.API_URL}request-room/approve/user/${user}`;
    this.loadEvents();
  }

  create(requestRoom: RequestRoom): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const modalRef = this.modalService.open(CreateRequestComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.model = requestRoom;
      modalRef.componentInstance.resolve = resolve;
    });
  }

  delete(id: String, title: String): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const modalRef = this.modalService.open(DeleteRequestComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.resolve = resolve;
    });
  }

  getRooms() {
    this.roomService.getRooms().subscribe(
      (data: Room[]) => {
        this.rooms = data;
      },
      (error: any) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
