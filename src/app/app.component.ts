import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {environment} from "../environments/environment";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PiCalendar';

  selectedLanguage = 'vi';
  

  message: any = null;

  constructor(private translate: TranslateService,
              private cookieService: CookieService,
              private router: Router) {
    this.requestPermission();
    this.listenForMessages();
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.setAbc();

    if (this.checkCookie('expiryTime') === true) {
      const now = new Date();
      // @ts-ignore
      if (now > this.cookieService.get('expiryTime')) {
        alert('Phiên đăng nhập hết hạn');
        localStorage.clear();
        sessionStorage.clear();
        this.cookieService.deleteAll();
        this.router.navigate(['']);
      }

    }
  }

  changeLanguage() {
    this.translate.use(this.selectedLanguage);
  }

  setAbc() {
    this.cookieService.set('abc', 'false');
  }

  updateLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  checkCookie(cookieName: string) {
    // Lấy tất cả các cookies được lưu trữ
    var allCookies = document.cookie;

    // Chuyển đổi chuỗi cookie thành một mảng các cặp tên và giá trị cookie
    var cookieArray = allCookies.split(';');

    // Lặp qua mảng cookieArray để tìm cookie cần kiểm tra
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim(); // Loại bỏ khoảng trắng thừa

      // Kiểm tra xem cookie có tên cookieName có tồn tại không
      if (cookie.indexOf(cookieName + '=') === 0) {
        return true; // Cookie tồn tại
      }
    }

    return false; // Cookie không tồn tại
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: environment.firebase.vapidKey}).then(token => {
      if (token) {
        console.log("token refreshed...", {token});
        this.cookieService.set("deviceToken", token);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listenForMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    })
  }

  hiddenHandler() {
    this.message = null
  }
}
