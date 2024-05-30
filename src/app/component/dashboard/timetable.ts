export class Timetable {
  private timetableIds: string;

  get getTimetableIds(): string {
    return this.timetableIds;
  }

  set setTimetableIds(value: string) {
    this.timetableIds = value;
  }

  constructor(timetableIds: string) {
    this.timetableIds = timetableIds;
  }
}
