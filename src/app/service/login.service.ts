import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = AppConstants.BASE_URL_API;

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/api/auth/login", data)
      .pipe(catchError(this.handleError));
  }

  register(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/api/register", data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorCode = error.error.code;
    if (error.status != 200) {
      this.router.navigate(['/notification/' + errorCode]);
    }
    return throwError('St bad happend; plz try again later.');
  }
}
