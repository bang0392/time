export class UserDetailsDTO {
    id: string = "";
    username: string = "";
    email: string = "";
    firtName: string = "";
    lastName: string = "";
    fullname: string = "";
    displayName: string = "";
    dateOfBirth: Date = new Date;
    lang: string = "";
    avatar: string = "";
    file : File | undefined;
    sex: number = 1;
    role: string = ""; 
    status: number = 1;
}