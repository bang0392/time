import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CalendarOptions} from "@fullcalendar/core";
import {SetEventService} from "./set-event.service";
import {Timetable} from "../component/dashboard/timetable";
import {Event} from "../component/dashboard/event";


@Injectable({
  providedIn: 'root'
})

export class NavbarServices {
  private selectedTabSlideBar = new BehaviorSubject<string>('calendar');
  selectedTab$ = this.selectedTabSlideBar.asObservable();
  calendarOptions!: CalendarOptions;
  private timetableId!: string;

  private event!: Event[];

  constructor(private setEventService: SetEventService) {
  }

  private abcSubject = new BehaviorSubject<string>('');
  abc$ = this.abcSubject.asObservable();

  setSelectedTab(tab: string): void {
    this.selectedTabSlideBar.next(tab);
  }

  setTimetableId(timetableId: string): void {
    this.timetableId = timetableId;
  }

  updateTimetableEvents(): CalendarOptions {
    this.setEventService.getEventsByTimetableIds([new Timetable(this.timetableId)]).subscribe((response: any) => {
      this.calendarOptions = {
        events: response.data,
      };
      // this.event.push(response.data);
    });
    console.log('Events:', this.calendarOptions.events);
    return this.calendarOptions;
  }
}
