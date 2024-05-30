import { Injectable } from '@angular/core';
import { Timetable } from '../component/user/timetable/dto/timetable';
import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Directive({

  selector: '[appOutsideClick],[appColorPicker]',

})

export class TimetableService {


  constructor(private http : HttpClient) { }

  //Todo code list TimeTable
  private apiUrlTimeTable = 'http://localhost:8080/api/timetable';


  private timetableUpdate = new BehaviorSubject<boolean>(false);
  public timetableUpdate$ = this.timetableUpdate.asObservable();

  updateRecentTimetable(timetable: {id:string; name: string; color: string;description:string; fromTime: Date ; toTime : Date}) {

        let timetables = JSON.parse(localStorage.getItem('recentTimetables') || '[]');
        timetables.push(timetable);
        localStorage.setItem('recentTimetables', JSON.stringify(timetables));

  }

  //Todo code API create timetable
  createTimetable(timetable: Timetable): Observable<Timetable> {

    return this.http.post<Timetable>(`${this.apiUrlTimeTable}/create`, timetable);

  }


  //Todo code API update timeTable
  updateTimetable(id: string, timetable: Timetable): Observable<Timetable> {

    return this.http.put<Timetable>(`${this.apiUrlTimeTable}/update/${id}`, timetable);

  }

  //Todo code API update timeTable status
  updateTimeTableStatus(): Observable<any> {

    return this.http.get(`${this.apiUrlTimeTable}/update-status`);
    this.timetableUpdate.next(true);

  }



  //Todo code API get by Id timeTable
  // checkTimetableExists(id: string): Observable<boolean> {

  //   return this.http.get<boolean>(`${this.apiUrlTimeTable}/get-by-timetable/${id}`);

  // }

  checkTimetableExists(id: string, status: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.apiUrlTimeTable}/get-by-timetable/${id}?status=${status}`);

  }


  //Todo code API get by Id storage TimeTable
  storageTimeTable(id: string, timetable: Timetable): Observable<Timetable> {

    return this.http.put<Timetable>(`${this.apiUrlTimeTable}/storage/${id}`, timetable);

  }


    //Todo code reload timetable navbar
    private reloadListTimetables = new Subject<void>();
    public reloadTimetablesList = this.reloadListTimetables.asObservable();

    reloadTimetables() {

      this.reloadListTimetables.next();

    }

}
