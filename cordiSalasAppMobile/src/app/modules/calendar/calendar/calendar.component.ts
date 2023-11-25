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
    dayMaxEvents: true,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      meridiem: 'short',
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventAdd: (x) =>
      this.createRequestRoom(
        this.userId,
        this.selectedRoom,
        x.event.start,
        x.event.end,
        StateRequestEnum.Approved
      ),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private sessionStorage: SessionStorageService,
    public requestRoomService: RequestService
  ) {}

  getUserId() {
    let user = this.sessionStorage.getItem('usuario');
    this.userId = user.document;
  }

  createRequestRoom(
    userId: string,
    room: string,
    startDate: Date | null,
    endDate: Date | null,
    status: StateRequestEnum
  ) {
    console.log('hola');

    let model = {
      date: startDate,
      start_date: startDate,
      end_date: endDate,
      room_id: room,
      user_id: userId,
      status: status,
    } as RequestRoom;
    this.requestRoomService.createRequestRoom(model).subscribe(
      (data) => {
        this.requestRoomService.requestRoomSubject.next(true);
      },
      (error) => {
        console.error('Error al crear', error);
      }
    );
    this.loadEvents();
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
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
}