export class Event {
  private Id!: string;
  private StartTime!: Date;
  private EndTime!: Date;
  private Subject!: string;
  private Color!: string;
  private RecurrenceRule!: string;

  constructor(Id: string, StartTime: Date, EndTime: Date, Subject: string, Color: string, RecurrenceRule: string) {
    this.Id = Id;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
    this.Subject = Subject;
    this.Color = Color;
    this.RecurrenceRule = RecurrenceRule;
  }
}
