import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timetable } from "../component/dashboard/timetable";

@Injectable({
  providedIn: 'root',
})
export class SetEventService {
  baseUrl: string = AppConstants.BASE_URL_API;

  constructor(private http: HttpClient) {}

  setEvent(data: any): Observable<any> {
    const params = new HttpParams().set('email', data);
    return this.http.post(this.baseUrl + '/api/event', {}, { params });
  }

  getEvent(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/event');
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/event/' + id);
  }

  searchEvent(title: string): Observable<any> {
    const apiUrl = this.baseUrl + '/api/event/search?title=' + title;
    return this.http.get(apiUrl);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post(this.baseUrl + '/api/event/add-event', eventData);
  }

  getAllTimetables(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/event/get-all-timetable');
  }

  getEventsByTimetableIds(timetables: Timetable[]): Observable<any> {
    const requestBody = timetables.map((t) => ({
      timetableIds: t.getTimetableIds,
    }));
    return this.http.post(
      this.baseUrl + '/api/event/get-by-list-timetable-id',
      requestBody
    );
  }

  updateEvent(eventId: string, updatedEvent: any): Observable<any> {
    const url = `${this.baseUrl}/api/event/update-event/${eventId}`;
    return this.http.put(url, updatedEvent);
  }

  deleteEvent(eventId: string): Observable<any> {
    const url = `${this.baseUrl}/api/event/delete-event/${eventId}`;
    return this.http.delete(url)
  }

}
