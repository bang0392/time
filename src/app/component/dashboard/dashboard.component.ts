import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthGoogleService } from 'src/app/service/auth-google.service';
import { SetEventService } from 'src/app/service/set-event.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { TranslateService } from '@ngx-translate/core';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Timetable } from "./timetable";
import interactionPlugin from "@fullcalendar/interaction";

import {
  EventSettingsModel,
  DayService,
  WeekService,
  TimelineMonthService,
  MonthService,
  AgendaService,
  CellClickEventArgs, EventRenderedArgs
} from '@syncfusion/ej2-angular-schedule';
import { Event } from "./event";

@Component({
  selector: 'app-dashboard',
  providers: [DayService, WeekService, MonthService, AgendaService, TimelineMonthService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userProfile: any;
  userEmail: string | null;
  avatarUrl: string = "../../../assets/user-icon.png";
  eventId!: string;
  initialView: string = 'week';
  timetables: any[] = [];
  selectedTimetables: Timetable[] = [];

  isMenuCollapsed: boolean = false;

  timetableId: string = '';

  isTimetableListOpened: boolean = true;
  isFilterTabOpened: boolean = false;

  events: CalendarEvent[] = [];

  lang !: string;
  id = this.cookieService.get('userId');

  constructor(private authGoogleService: AuthGoogleService,
    private setEventService: SetEventService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private cookieService: CookieService,
    private translate: TranslateService,
    private userService: UserService,
    private dialog: MatDialog) {
    this.userEmail = this.cookieService.get('userEmail');
    this.userProfile = this.authGoogleService.getProfile();
    if (this.userProfile) {
      this.userEmail = this.userProfile.email;
    }
    translate.setDefaultLang('vi');
    this.loadImage();
  }

  public eventList: object[] = this.setEvents();
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = {
    dataSource: this.eventList
  };

  ngOnInit() {
    this.loadLanguages();
    this.userProfile = this.authGoogleService.getProfile();
    this.validateCookie();
    this.cookieService.delete('timetableId');
    this.getAllTimetable();
    this.cdr.detectChanges();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
  };

  validateCookie() {
    if (!this.cookieService.get("isLoggedIn")) {
      this.router.navigate(['']);
    }
  }

  handleToggleMenuEvent() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isTimetableListOpened = false;
  }

  loadImage() {
    if (this.cookieService.get("avatarURL")) {
      this.avatarUrl = this.cookieService.get("avatarURL");
    }
  }

  setEvents(): object[] {
    let events: object[] = [];
    this.setEventService.getEvent().subscribe((res: any) => {
      for (let item of res.data) {
        let intervalConfig = 'FREQ=' + item.intervalConfig.frequency + ';COUNT=' + item.intervalConfig.count
        let event = new Event(item.id, item.start, item.endDate, item.title, item.color, intervalConfig);
        events.push(event);
      }
    })
    return events;
  }

  openFilterTab() {
    this.isFilterTabOpened = !this.isFilterTabOpened;
  }

  onTimetableIdSelected(timetableId: string): void {
    let newEvents: any[] = [];

    this.calendarOptions = {
      initialView: 'dayGridWeek',
      eventClick: this.handleEventClick.bind(this),
      plugins: [dayGridPlugin, interactionPlugin],
      dayHeaderFormat: { weekday: 'short', day: 'numeric' },
      events: newEvents,
    }

    if (timetableId === 'all') {
      this.setEventService.getEvent().subscribe(data => {
        this.calendarOptions = {
          events: data.data,
        };
      })
    } else {
      this.setEventService.getEventsByTimetableIds([new Timetable(timetableId)]).subscribe((response: any) => {
        this.calendarOptions = {
          events: response.data,
        };
        console.log(response.data);
      });
    }

    this.cdr.detectChanges();
  }

  handleEventClick(arg: any) {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: { eventId: arg.event.id },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllTimetable() {
    this.setEventService.getAllTimetables().subscribe((response: any) => {
      if (response.status && response.data) {
        this.timetables = response.data;
      }
    });
  }

  onTimetableCheckboxChange(timetable: any) {
    const index = this.selectedTimetables.findIndex(t => t.getTimetableIds === timetable.id);

    if (index === -1) {
      this.selectedTimetables.push(new Timetable(timetable.id));
    } else {
      this.selectedTimetables.splice(index, 1);
    }

    this.updateEventsBySelectedTimetables();
  }

  updateEventsBySelectedTimetables() {
    this.setEventService.getEventsByTimetableIds(this.selectedTimetables).subscribe((response: any) => {
      this.calendarOptions = {
        events: response.data,
      };
      console.log(response.data);
    });
  }


  addEvent(): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: { eventId: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showEventDetailsById(id: string): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: { eventId: id },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  loadLanguages() {
    this.userService.loadLanguages().subscribe(
      (response: any) => {
        console.log(response.data);
        this.lang = response.data.lang;
        this.translate.use(this.lang);
      }
    );
  }

  emptyAttributes() {

  }
  onCellDoubleClick(args: any): void {
    args.cancel = true;

    this.addEvent();
  }

  onCellClick(args: CellClickEventArgs): void {
    // Disable the default behavior of the cellClick event
    args.cancel = true;
  }

  onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data['Color'] as string;
    if (!args.element || !categoryColor) {
      return;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
}
