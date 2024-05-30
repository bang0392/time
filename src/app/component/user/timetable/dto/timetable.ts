export class Timetable {

    //Todo code entity by timeTable

    public id                !: string;
    public color             !: string;
    public name              !: string;
    public description       !: string;
    public status            !: number;
    // public code              !: string;
    public fromTime         !: Date;
    public toTime           !: Date;

  constructor(id:string,color:string,name:string,description:string,status:number,fromTime:Date,toTime:Date){

    this.id = id;
    this.color = color;
    this.name = name;
    this.description = description;
    this.status = status;
    // this.code = code;
    this.fromTime = fromTime;
    this.toTime = toTime;

  }


}
