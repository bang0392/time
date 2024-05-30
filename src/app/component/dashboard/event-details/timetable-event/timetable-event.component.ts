import { SetEventService } from './../../../../service/set-event.service';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimetableService } from 'src/app/service/timetable.service';

declare var $: any;

@Component({
  selector: 'app-timetable-event',
  templateUrl: './timetable-event.component.html',
  styleUrls: ['./timetable-event.component.css'],
})
export class TimetableEventComponent {
  timetables: any[] = [];

  constructor(
    private setEventService: SetEventService,
    private timeTableService: TimetableService,
    public dialogRef: MatDialogRef<TimetableEventComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const storedTimetables = localStorage.getItem('recentTimetables');
    if (storedTimetables) {
      this.timetables = JSON.parse(storedTimetables);
      console.log('Data2: ', this.timetables);
    }
    this.cdr.detectChanges();
    // this.getAllTimetableByUser();
    this.loadRecentTimetables();
  }

  // getAllTimetableByUser() {
  //   this.setEventService.getAllTimetables().subscribe((response: any) => {
  //     if (response.status && response.data) {
  //       this.timetables = response.data;
  //     }
  //   });
  // }

  loadRecentTimetables() {
    const storedTimetables = localStorage.getItem('recentTimetables');
    if (storedTimetables) {
      const timetables = JSON.parse(storedTimetables);
      timetables.forEach((timetable: any) => {
        this.timeTableService
          .checkTimetableExists(timetable.id, 1)
          .subscribe((exists) => {
            if (exists) {
              this.timetables.push(timetable);
            } else {
              console.log(
                `Timetable with ID ${timetable.id} no longer exists.`
              );
            }
          });
      });
    }
  }
}
