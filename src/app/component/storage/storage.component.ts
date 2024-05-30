import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {StorageService} from "../../service/storage.service";
import { CookieService } from 'ngx-cookie-service';
// import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-storage-details',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent {
  timetables! : any[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private router: Router,
    private cookieService: CookieService,
    private storageService: StorageService,
    private dialogRef: MatDialogRef<StorageComponent>,
  ) {
    this.getTimetableStorage();
  }

  getTimetableStorage(){
    this.storageService.getTimetable().subscribe((res) => {
      this.timetables = res;
      console.log(res)
    }, (err) => {console.log(err)})
  }

  getEventByTimetableId(idTimetable: string){
    this.storageService.getEvent(idTimetable).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  deleteStorage(idTimetable: string){
    Swal.fire({
      title: "Xóa lưu trữ?",
      text: "Bạn chắc chắn xóa!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.storageService.deleteTimetable(idTimetable).subscribe((res) => {
          Swal.fire({
            title: "Xóa lưu trữ!",
            text: "Xóa thành công.",
            icon: "success"
          });
          this.dialogRef.close();
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
