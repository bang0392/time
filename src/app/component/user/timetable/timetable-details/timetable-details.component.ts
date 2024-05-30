import { Component , OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Timetable } from '../dto/timetable';
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-timetable-details',
  templateUrl: './timetable-details.component.html',
  styleUrls: ['./timetable-details.component.css']
})
export class TimetableDetailsComponent implements OnInit {

  id: string = "";
  color: string = "";
  name: string = "";
  description: string = "";
  status!: number;
  code : string = "";
  fromTime!: Date;
  toTime!: Date;

  isColorPickerVisible: boolean = false;
  selectedTimetableColor: string | null = null;
  colorList: string[] = ['#12AFF0', '#FACA4A', '#F47690', '#A584F3','#555CF3','#FE6BBA','#1AD598','#EA3A3D','#403CEC','#F3654A','#FEC1C1','#DAFFC9','#E50E9C','#00B55E'];
  selectedColor: string = '';

  timetableArray: Timetable[] = [];
  isTimetableDataAvailable: boolean = false;

  constructor(private timetableService: TimetableService,
              private router : Router,
              private dialogRef: MatDialogRef<TimetableDetailsComponent>,
              ) { }

  ngOnInit(): void {
    this.isColorPickerVisible = true;

    const storedTimetableArray = localStorage.getItem('timetableArray');
    if (storedTimetableArray) {
      this.timetableArray = JSON.parse(storedTimetableArray);
      this.isTimetableDataAvailable = true;
    }
  }

  toggleColorPicker() {
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  selectColor(color: string) {

    this.selectedColor = color;

  }

  saveTimeTable() {
    // Xác thực dữ liệu trước khi gửi request
    if (!this.name || !this.selectedColor || !this.fromTime || !this.toTime || !this.description) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng điền đầy đủ thông tin bắt buộc.',
        confirmButtonText: 'Đóng'
      });

      return;

    }

    // Dữ liệu được gửi đi
    const timeTableData = {
      id: this.id,
      color: this.selectedColor,
      name: this.name,
      description: this.description,
      status: 1,
      fromTime: this.fromTime,
      toTime: this.toTime
    };

    // Gửi dữ liệu đến server
    this.timetableService.createTimetable(timeTableData).subscribe(
      (response) => {

        const newTimeTable = response;
        console.log("Timetable mới được tạo với ID:", newTimeTable.id);

        // Thông báo thêm thành công
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Chuyển hướng sau khi thêm thành công
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        });

        // Lưu thông tin Timetable vào localStorage
        localStorage.setItem('recentTimetable', JSON.stringify({

          id: newTimeTable.id,
          name: this.name,
          color: this.selectedColor

        }));

          this.timetableService.updateRecentTimetable({
            id : newTimeTable.id,
            name: this.name,
            color: this.selectedColor,
            description: this.description,
            fromTime : this.fromTime,
            toTime : this.toTime

          });

        this.close();

      },
      (error) => {
        // Xử lý khi có lỗi xảy ra
        console.error('Lỗi khi thêm sự kiện', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Lỗi dữ liệu ! Vui lòng điền lại',
          confirmButtonText: 'Đóng'
        });
      }
    );
  }

  close() {
    // Đóng dialog/form
    this.dialogRef.close();

  }

  convertToISOStringLocal(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('.')[0];
  }

  //Todo code validate

  fromTimeValid   : boolean = true;
  toTimeValid     : boolean = true;

  validateFromTime() {
    const fromTimeDate = new Date(this.fromTime);
    const toTimeDate = new Date(this.toTime);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset giờ, phút, giây và miligiây về 0

    this.fromTimeValid = !(fromTimeDate < currentDate);

    this.toTimeValid = !(toTimeDate < fromTimeDate);

  }

}
