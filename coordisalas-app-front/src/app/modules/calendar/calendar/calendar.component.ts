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
import { SessionStorageService } from 'src/app/services';
import { RequestService } from 'src/app/services';
import { RequestRoom } from 'src/app/models';
import { StateRequestEnum } from 'src/app/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { DeleteRequestComponent } from '../delete-request/delete-request.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  public userId: string = '';
  selectedFilterType: string = 'room';
  selectedRoom: string = 'Sala A';
  selectedUser: string = '';
  calendarVisible = true;
  url: string = `${ServiceConfig.API_URL}request-room/approve/room/Sala_A`;
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private sessionStorage: SessionStorageService,
    private modalService: NgbModal,
    public requestRoomService: RequestService
  ) {}

  getUserId() {
    let user = this.sessionStorage.getItem('usuario');
    this.userId = user.document;
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
      status: StateRequestEnum.Approved,
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
    const selectedRoom = event.target.value;
    this.filterByRoom(selectedRoom);
  }

  filterByRoom(room: string) {
    this.url = `${ServiceConfig.API_URL}request-room/approve/room/${room}`;
    this.loadEvents();
  }

  onSelectUser(event: any) {
    const selectedUser = event.target.value;
    this.filterByUser(selectedUser);
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
}
