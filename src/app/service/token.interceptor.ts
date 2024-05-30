import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError, } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { now } from "moment-timezone";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("id_token");
    const token2 = this.cookieService.get("access_token");
    if (token) {
      const payload = this.parseJwt(token);

      if (!payload || Date.now() >= payload.exp * 1000) {
        sessionStorage.removeItem("id_token");
      } else {
        request = this.addToken(request, token);
        // request = this.addContentType(request, 'application/json');
      }
    } else {
      const payload = this.parseJwt(token2);

      if (!payload || Date.now() >= payload.exp * 1000) {
        this.cookieService.delete("access_token");
      } else {
        request = this.addToken(request, token2);
        // request = this.addContentType(request, 'application/json');
      }
    }

    return next.handle(request)
      .pipe(
        catchError((error) => {
          let message = '';
          if (error.status === 500) {
            //Xử lý lỗi
          }

          return throwError(() => new Error(error?.message));
        })
      );
  }

  private addContentType(request: HttpRequest<any>, contentType: string) {
    return request.clone({
      setHeaders: {
        'Content-Type': contentType,
      },
    });
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
}
