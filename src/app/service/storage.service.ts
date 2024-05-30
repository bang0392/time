import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService{
  baseUrl : string = AppConstants.BASE_URL_API;

  constructor(private http: HttpClient) { }

  getTimetable(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/api/storage")
  }

  getEvent(idTimetable: string): Observable<any> {
    return this.http.get(this.baseUrl + "/api/storage/" + idTimetable);
  }

  deleteTimetable(idTimetable: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/api/storage/clear/" + idTimetable);
  }
}
