import { Component , OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Timetable } from '../dto/timetable';
import { TimetableService } from 'src/app/service/timetable.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-edit-timetable',
  templateUrl: './details-edit-timetable.component.html',
  styleUrls: ['./details-edit-timetable.component.css']
})
export class DetailsEditTimetableComponent implements OnInit{

  isColorPickerVisible: boolean = false;
  selectedTimetableColor: string | null = null;
  colorList: string[] = ['#12AFF0', '#FACA4A', '#F47690', '#A584F3','#555CF3','#FE6BBA','#1AD598','#EA3A3D','#403CEC','#F3654A','#FEC1C1','#DAFFC9','#E50E9C','#00B55E'];
  selectedColor: string = '';

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any, // Nhận dữ liệu được truyền vào
    public dialogRef: MatDialogRef<DetailsEditTimetableComponent>,
    private timetableService: TimetableService,
    private router : Router,

  ){

    this.isColorPickerVisible = true;

  }


  ngOnInit(): void {

    if (this.data.timetable && this.data.timetable.fromTime) {

      this.data.timetable.fromTime = this.convertISOToDateTimeLocal(this.data.timetable.fromTime);
      console.log("Dữ liệu thời gian sau khi chuyển đổi:", this.data.timetable.fromTime);

    }

    //Todo code view color

    if (this.data.timetable) {

      this.selectedColor = this.data.timetable.color;

    }

  }


  toggleColorPicker() {
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  selectColor(color: string) {

    this.selectedColor = color;
    this.data.timetable.color = color;

  }


  //Todo convert DateTime

  convertISOToDateTimeLocal(isoString: string): string {
    // Chuyển đổi ISO 8601 sang định dạng datetime-local (YYYY-MM-DDTHH:MM)
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Chuyển đổi sang 2 chữ số
    const day = date.getDate().toString().padStart(2, '0'); // Chuyển đổi sang 2 chữ số
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;

  }


  //Todo code update timeTable
  updateTimetable(): void {

    this.timetableService.updateTimetable(this.data.timetable.id, this.data.timetable).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500,
        });

        const storedTimetables = JSON.parse(localStorage.getItem('recentTimetables') || '[]');
        const index = storedTimetables.findIndex((item: any) => item.id === this.data.timetable.id);

        if (index !== -1) {

          const updatedTimetable = 'timeTable' in response ? response.timeTable : response;
          storedTimetables[index] = updatedTimetable;

        }

        localStorage.setItem('recentTimetables', JSON.stringify(storedTimetables));
        this.timetableService.reloadTimetables();
        this.dialogRef.close();

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Vui lòng điền đầy đủ thông tin!',
          text: 'Không thể cập nhật thời khóa biểu. Vui lòng thử lại.',
        });
      }
    );
  }


  // Todo code close

  close(){

    this.dialogRef.close();

  }


  //Todo code check validate

  isFromTimeInvalid: boolean = false;
  isToTimeInvalid : boolean = false;

  checkFromTimeValidity() {

    const fromTime = new Date(this.data.timetable.fromTime);
    const toTime = new Date(this.data.timetable.toTime);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.isFromTimeInvalid = fromTime < today;
    this.isToTimeInvalid = toTime < fromTime;

  }

}
