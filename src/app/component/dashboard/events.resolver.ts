import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SetEventService } from "../../service/set-event.service";
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class EventsResolver implements Resolve<CalendarEvent[]> {
  constructor(private setEventService: SetEventService) {}

  resolve(): Observable<CalendarEvent[]> {
    // Gọi API để tải dữ liệu và trả về dữ liệu cho Resolver
    return this.setEventService.getEvent();
  }
}
