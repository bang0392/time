import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/service/auth-google.service';
import { UserService } from 'src/app/service/user.service';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { UserDetailsDTO } from './dto/user.user-details.dto';
import { NotificationServices } from 'src/app/service/notification.services';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userProfile: any
  userDetail: UserDetailsDTO = new UserDetailsDTO;


  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
    private languageService: AppComponent,
    private cookieService: CookieService,
    private translate: TranslateService,
    private notificationServices: NotificationServices,
  ) {
    this.userProfile = this.authGoogleService.getProfile();
    this.getProfileUser();
  }

  ngOnInit(): void {
    this.getProfileUser();
  }

  getProfileUser() {
    this.userService.getUserDetails().subscribe((response: any) => {
      this.userDetail = response.data;
    });
  }


  updateProfile() {
    Swal.fire({
      title: 'Bạn chắc chắn chứ?',
      text: 'Xác nhận cập nhật',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, cập nhật!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUser(this.userDetail).subscribe({
          next: (data: any) => {
            const successMessage = data.message || 'Update Succes!';
            Swal.fire({
              icon: 'success',
              title: successMessage,
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            console.error(error)
            let errorMessage = 'Update Failse';

            if (this.userDetail.sex == null) {
              errorMessage = "Gender cannot be left blank";
            } else if (this.userDetail.dateOfBirth == null) {
              errorMessage = "Date of birth cannot be left blank";
            } else if (this.userDetail.fullname == null) {
              errorMessage = "Full name cannot be left blank";
            }

            Swal.fire({
              icon: 'error',
              title: errorMessage,
              showConfirmButton: true,
              confirmButtonText: 'Thoát'
            });
            this.getProfileUser();
          }
        });
      }
    });
  }






}
