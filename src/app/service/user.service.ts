import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FriendDTO } from '../component/user/profile/dto/friend.dto';
import { UserDetailsDTO } from '../component/user/profile/dto/user.user-details.dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = AppConstants.BASE_URL_API;

  lang !: string;

  private countriesUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient,
    private translate: TranslateService) { }

  updateUser(userDetail: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.baseUrl}/api/users/update`, userDetail);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/api/users/" + id);
  }

  getAvailableLanguages(): Observable<string[]> {
    const apiUrl = 'http://localhost:8080/api/users/all-language';
    return this.http.get<string[]>(apiUrl);
  }

  loadLanguages(): Observable<any> {
    const apiUrl = this.baseUrl + "/api/users/language";
    return this.http.get(apiUrl).pipe(
      map((response: any) => {
        console.log(response.data);
        this.lang = response.data.lang;
        this.translate.use(this.lang);
        return this.lang;
      })
    );
  }
  
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.countriesUrl);
  }

  loadTimeZone(): Observable<any> {
    const apiUrl = this.baseUrl + "/api/users/timeZone";
    return this.http.get(apiUrl);
  }

  loadImage(userId: string): Observable<any> {
    const apiUrl = this.baseUrl + `/api/users/imageByUser/${userId}`;
    return this.http.get(apiUrl, {
      observe: 'response', responseType: 'text',
    });
  }

  addSettingsToUser( userSetting: any): Observable<any> {
    const apiUrl = this.baseUrl + `/api/users/settings`;
    return this.http.post(apiUrl, userSetting);
  }

  setLanguageForUser(lang: string): Observable<any> {
    const apiUrl = this.baseUrl + `/api/users/language?lang=${lang}`;
    return this.http.post(apiUrl, null);
  }

  uploadImage(userId: string, file: File): Observable<any> {
    const apiUrl = this.baseUrl + `/api/users/image/${userId}`;
    const formData: FormData = new FormData();
    formData.append('img', file, file.name);

    return this.http.post(apiUrl, formData);
  }

  //Hoàng

  addFriend(data: string): Observable<any> {
    const apiUrl = this.baseUrl + `/api/users/addfriend?emailFriend=${data}`;
    return this.http.post(apiUrl, null);
  }

  getListFriend(): Observable<FriendDTO[]> {
    return this.http.get<UserDetailsDTO[]>(this.baseUrl + "/api/users/getFriend");
  }

  getUserDetails(): Observable<UserDetailsDTO> {
    return this.http.get<UserDetailsDTO>(this.baseUrl + "/api/users/me");
  }

  deleteFriend(friendId: string): Observable<any> {
    const apiUrl = this.baseUrl + `/api/users/${friendId}`;
    return this.http.delete(apiUrl);
  }
  ////////////////////////////////
}
