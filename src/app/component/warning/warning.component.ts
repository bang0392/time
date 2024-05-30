import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {
  message: string = '';
  errorCode!: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.errorCode = params.get('code') || '';
      this.message = this.getErrorMessage(this.errorCode);

      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 3000);

      // xử lý lỗi (Chưa có API)

      // if (this.errorCode == '200') {
      //   setTimeout(() => {
      //     this.router.navigate(['dashboard']);
      //   }, 3000);
      // } else {
      //   setTimeout(() => {
      //     this.router.navigate(['']);
      //   }, 3000);
      // }
    });

  }

  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case '200':
        return 'Đăng nhập thành công'
      case '404':
        return 'Không tìm thấy trang';
      case '500':
        return 'Lỗi máy chủ';
      default:
        //Đặt tạm do chưa có API
        return 'Đăng nhập thành công';
      // return 'Lỗi không xác định';
    }
  }
}
