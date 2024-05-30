import { Component, Inject, OnInit } from '@angular/core';
import { DetailsEditTimetableComponent } from '../details-edit-timetable/details-edit-timetable.component';
import { Router } from '@angular/router';
import { Timetable } from '../dto/timetable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TimetableService } from 'src/app/service/timetable.service';
import { NavbarComponent } from 'src/app/component/navbar/navbar.component';

@Component({
  selector: 'app-show-view-timetable',
  templateUrl: './show-view-timetable.component.html',
  styleUrls: ['./show-view-timetable.component.css']
})
export class ShowViewTimetableComponent implements OnInit {


  selectedTimetable: Timetable = {} as Timetable;

  constructor(

    public dialogRef: MatDialogRef<ShowViewTimetableComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private timetableService : TimetableService,
    // private navbarComponent : NavbarComponent

    ){}


    ngOnInit(): void {}


  //Todo code edit to TimeTable

  editTimeTable(): void {

    this.dialogRef.close();

    this.dialog.open(DetailsEditTimetableComponent, {
      width: '500px',
      data: {

        timetable: this.data.timetable ,

      }

    });

  }

  //Todo code storage to TimeTable

  storageTimeTable(): void {
    Swal.fire({
      title: 'Bạn chắc chắn muốn lưu trữ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed && this.data.timetable && this.data.timetable.id) {
        this.timetableService.storageTimeTable(this.data.timetable.id, this.data.timetable).subscribe(response => {
            Swal.fire('Đã lưu trữ!', 'Dữ liệu của bạn đã được lưu trữ.', 'success');
            this.dialogRef.close();
            // this.navbarComponent.loadRecentTimetables();
            this.timetableService.reloadTimetables(); // Trigger reload ở đây

          }, error => {
            // Xử lý trường hợp xảy ra lỗi khi gọi API
            console.error('Có lỗi xảy ra khi lưu trữ Timetable', error);
            Swal.fire('Lỗi!', 'Không thể lưu trữ dữ liệu.', 'error');
            this.dialogRef.close();
          });
      }

    });

   this.dialogRef.close();

  }



}
