import { Component } from '@angular/core';
import { AuthGoogleService } from '../../service/auth-google.service';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!: FormGroup;
  activeFlag: string = '';

  constructor(private authGoogleService: AuthGoogleService,
    private loginService: LoginService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private router: Router) {
    translate.setDefaultLang('vi');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
    if (localStorage.getItem('isLoggedIn') !== null) {
      // Người dùng đã đăng nhập, chuyển hướng đến trang chính
      this.router.navigate(['dashboard']);
    }
    if (this.checkCookie("isLoggedIn") === true) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    // this.authGoogleService.login();
    window.location.replace('http://localhost:8080/oauth2/authorization/google');
  }

  protected readonly window = window;

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

  changeBorderColor(flag: string) {
    this.activeFlag = flag;
    this.translate.use(flag);
  }
}
