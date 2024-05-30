import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { th } from 'date-fns/locale';

@Injectable({
    providedIn: 'root'
})

export class NotificationServices{
    baseUrl : string = AppConstants.BASE_URL_API;

    constructor(private http: HttpClient) { }

     addSetting(data : any): Observable<any>{
        return this.http.post<any>(this.baseUrl + "/api/settingnotification/add",data)
     }

     getSetting() : Observable<any>{
        return this.http.get( this.baseUrl + "/api/settingnotification/findByUserId")
     }

     getCountUnread() : Observable<any>{
      return this.http.get(this.baseUrl + "/api/notification/countUnRead")
     }
}
  