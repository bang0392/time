import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { SetEventService } from 'src/app/service/set-event.service';
import { UserService } from 'src/app/service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TimetableEventComponent } from './timetable-event/timetable-event.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
  id!: string;
  title!: string;
  startDate!: Date;
  endDate!: Date;
  description!: string;
  selectedRepeatOption: string = 'No repeat';

  lang!: string;
  idUser = this.cookieService.get('userId');
  idTimetable = this.cookieService.get('timetableId');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private router: Router,
    private setEventService: SetEventService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private userService: UserService,
    private dialogRef: MatDialogRef<EventDetailsComponent>,
    private dialog: MatDialog
  ) {
    this.loadEventDetails(data.eventId);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {
    this.loadLanguages();
  }

  openScheduleModal(): void {
    const dialogRef = this.dialog.open(TimetableEventComponent, {
      width: '200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addEvent() {
    const eventData = {
      title: this.title,
      timetableId: this.idTimetable,
      start: this.startDate,
      end: this.endDate,
      description: this.description,
      intervalConfig: this.selectedRepeatOption,
    };

    this.setEventService.addEvent(eventData).subscribe(
      (response: any) => {
        console.log('Add event thành công', response);
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        });
        this.close();
      },
      (error) => {
        console.error('ERROR: ', error.status);
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  loadEventDetails(eventId: string): void {
    if (!eventId) {
      this.id = '';
      this.title = '';
      this.startDate = new Date();
      this.endDate = new Date();
      this.description = '';
      this.selectedRepeatOption = '';
    }
    this.setEventService.getEventById(eventId).subscribe((response: any) => {
      if (response.code === 200 && response.data) {
        console.log('Data: ', response.data);

        this.id = response.data.id;
        this.title = response.data.title;
        this.startDate = response.data.start;
        this.endDate = response.data.endDate;
        this.description = response.data.description;
        this.selectedRepeatOption = response.data.intervalConfig;
      }
    });
  }

  updateEvent(): void {
    if (this.id && this.id.trim() !== '') {
      const updatedEventData = {
        title: this.title,
        timetableId: this.idTimetable,
        userId: this.idUser,
        start: this.startDate,
        end: this.endDate,
        description: this.description,
        intervalConfig: this.selectedRepeatOption,
      };

      Swal.fire({
        title: 'Bạn chắc chắn muốn cập nhật sự kiện?',
        text: 'Hành động này không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          this.setEventService.updateEvent(this.id, updatedEventData).subscribe(
            (response) => {
              console.log('cập nhật sự kiện thành công', response);
              Swal.fire({
                icon: 'success',
                title: 'cập nhật thành công',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                const currentUrl = this.router.url;
                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate([currentUrl]);
                  });
              });
              this.close();
            },

            (error) => {
              console.error('Lỗi khi cập nhật sự kiện', error);
              // Optionally, you can show an error message or perform additional error handling.
            }
          );
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  deleteEvent(): void {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa sự kiện?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.setEventService.deleteEvent(this.id).subscribe(
          (response) => {
            console.log('Xóa sự kiện thành công', response);
            Swal.fire({
              icon: 'success',
              title: 'Xóa thành công',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
            });
            this.close();
          },
          (error) => {
            console.error('Lỗi khi xóa sự kiện', error);
            // Optionally, you can show an error message or perform additional error handling.
          }
        );
      }
    });
  }

  // Kiểm tra xem phần tử có thuộc component hay không
  private isInsideComponent(element: HTMLElement): boolean {
    const container = document.getElementById('event-details-container');
    return container?.contains(element) || false;
  }

  loadLanguages() {
    this.userService.loadLanguages().subscribe((response: any) => {
      console.log(response);
      this.lang = response;
      this.translate.use(this.lang);
    });
  }
}
