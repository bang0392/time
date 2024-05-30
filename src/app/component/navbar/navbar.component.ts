import { ChangeDetectorRef, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthGoogleService } from '../../service/auth-google.service';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { NotificationServices } from "../../service/notification.services";
import { NavbarServices } from "../../service/navbar.services";
import { UserDetailsDTO } from '../user/profile/dto/user.user-details.dto';
import { UserService } from 'src/app/service/user.service';
import { SetEventService } from "../../service/set-event.service";
import { DatePipe } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {EventDetailsComponent} from "../dashboard/event-details/event-details.component";
import { TimetableDetailsComponent } from '../user/timetable/timetable-details/timetable-details.component';
import { Timetable } from '../user/timetable/dto/timetable';
import { TimetableService } from 'src/app/service/timetable.service';
import { ShowViewTimetableComponent } from '../user/timetable/show-view-timetable/show-view-timetable.component';
import { DetailsEditTimetableComponent } from '../user/timetable/details-edit-timetable/details-edit-timetable.component';

import Swal from "sweetalert2";
import {StorageComponent} from "../storage/storage.component";
import { Observable, forkJoin, map } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent {

  avatarUrl!: string;
  countUnread: number = 0;
  timetables: any[] = [];

  isTimetableListOpened: boolean = true;

  isMenuCollapsed: boolean = false;

  isCheckTimeTable: boolean = false;

  isSearch: boolean = true;

  isAllN: boolean = false;

  selectedTabSlideBar: string = 'timetable';

  isPopupVisible: boolean = false;

  isAutocompleteVisible: boolean = false;

  searchValueInput: string = '';

  selectedTabPosition: any = { left: '0px', width: '58px' };

  userDetail: UserDetailsDTO = new UserDetailsDTO;

  selectedTimetable: {name: string, color: string} | null = null;

  events: any[] = [];

  timeTable: any[] = [];

  isMenuHidden = false;

  searchEventResult: any[] = []

  searchTimeTableResult: any[] = []

  recentTimetables: any[] = [];

  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private cookieService: CookieService,
    private notificationServices: NotificationServices,
    private navbarServices: NavbarServices,
    private userService: UserService,
    private setEventService: SetEventService,
    private navService: NavbarServices,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,

    //Todo code list timeTable

    private timeTableService : TimetableService

    ) {
    this.loadImage();
  }

  ngOnInit(): void {
    this.getCountUnread();
    this.getProfileUser();
    this.checkScreenWidth();
    this.navbarServices.selectedTab$.subscribe(tab => {
      this.selectedTabSlideBar = tab;
    });


    this.getAllTimetable();
    this.setEventService.getEvent().subscribe((response: any) => {
      this.events = response.data;
    })

    //Todo code list timeTable

    // const storedTimetables = localStorage.getItem('recentTimetables');

    // if (storedTimetables) {

    //   this.recentTimetables = JSON.parse(storedTimetables);

    // }

    // load check list timetable and status

    this.timeTableService.reloadTimetablesList.subscribe(() => {

      this.loadRecentTimetables();

    });

    this.updateListTimetableStatus();

    this.loadRecentTimetables();



  }

  getProfileUser() {
    this.userService.getUserDetails().subscribe((response: any) => {
      this.userDetail = response.data;
    });
  }
  @Output() toggleMenuEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() timetableClicked: EventEmitter<string> = new EventEmitter<string>();

  selectedTimetableId: string | null = null;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  getAllTimetable() {
    this.setEventService.getAllTimetables().subscribe((response: any) => {
      if (response.status && response.data) {
        this.timetables = response.data;
      }
    });
  }

  onTimetableItemClick(timetableId: string): void {
    this.cookieService.set('timetableId', timetableId);
    this.timetableClicked.emit(timetableId);
    this.selectedTimetableId = timetableId;
  }

  loadImage() {
    if (!this.cookieService.get("avatarURL")) {
      this.avatarUrl = "../../../assets/user-icon.png";
    } else {
      this.avatarUrl = this.cookieService.get("avatarURL");
    }
  }

  moveToCalendar() {
    this.navbarServices.setSelectedTab("calendar")
    this.router.navigate(['/dashboard']);

  }


  moveToSetting() {
    this.navbarServices.setSelectedTab("setting")
    this.router.navigate(['/setting']);
  }

  moveToProfile() {
    this.navbarServices.setSelectedTab("profile")
    this.router.navigate(['/profile']);
  }

  //chưa có component
  moveToNotification() {
    this.navbarServices.setSelectedTab("notification")
    this.router.navigate(['/notification']);

  }
  openTimetableList() {
    this.navbarServices.setSelectedTab("timetable")
    this.isTimetableListOpened = !this.isTimetableListOpened;

  }


  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isTimetableListOpened = false;
    this.toggleMenuEvent.emit();
  }

  getCountUnread() {
    this.notificationServices.getCountUnread().subscribe((response) => {
      this.countUnread = response.data;
    })
  }

  showAutocomplete() {
    this.isAutocompleteVisible = true;
  }

  hideAutocomplete() {
    setTimeout(() => {
      this.isAutocompleteVisible = false;
    }, 200);
  }


  onInputChange(): void {
    this.isAutocompleteVisible = true;
    this.searchEventResult = this.filterEvents(this.searchValueInput);
    this.searchTimeTableResult = this.filterTimeTable(this.searchValueInput);

  }

  filterEvents(searchValue: string): any[] {
    return this.events.filter(event => {
      return event.title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  filterTimeTable(searchValue: string): any[] {
    return this.timeTable.filter(timeTable => {
      return timeTable.name.toLowerCase().includes(searchValue.toLowerCase());
    })
  }

  handleEventClick(id: string) {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: { eventId: id },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    console.log(id)
  }


  // Todo code click Form TimaTable

  addTimeTable(): void {

    const dialogRef = this.dialog.open(TimetableDetailsComponent, {


    });

        dialogRef.afterClosed().subscribe(result => {

    });
  }

  //Todo code show log edit , share

  openDialog(event: any, timetable: any): void {

    const timetableCopy = Object.assign({}, timetable);
    const dialogRef = this.dialog.open(ShowViewTimetableComponent, {
            width: '160px',
            position: {
            top: `${event.clientY + 1}px`,
            left: `${event.clientX}px`
            },

            data: { timetable: timetableCopy }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.recentTimetables.findIndex(t => t.id === result.id);
        if (index !== -1) {
          this.recentTimetables[index] = result;
        }
      }
    });
  }




  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    if (window.innerWidth < 800) {
      if(this.isMenuCollapsed == false){
        this.isMenuCollapsed = true;
        this.isTimetableListOpened = false;
        this.isSearch = false;
        this.isAllN = true;
        this.toggleMenuEvent.emit();
      }
    }else{
      if(this.isMenuCollapsed == true){
        this.isMenuCollapsed = false;
        this.isTimetableListOpened = false;
        this.isSearch = true;
        this.isAllN = false;
        this.toggleMenuEvent.emit();
      }
    }
  }

  logut() {
    Swal.fire({
      iconHtml: "<img src=\"https://ava-grp-talk.zadn.vn/1/8/f/f/6/360/92970fd9906ef13a432b217d1a9731b9.jpg\" class=\"img_login\" style='width: 88px; border-radius:50%;'>",
      title: "Đăng xuất?",
      text: "Bạn chắc chắn đăng xuất!",
      // icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
        sessionStorage.clear();
        localStorage.clear();
        this.cookieService.deleteAll();
        this.router.navigate([""]);
      }
    });
  }


  //Todo code list get by timetable by Id and Status

    loadRecentTimetables() {
      const storedTimetables = localStorage.getItem('recentTimetables');
      if (storedTimetables) {
        const timetables = JSON.parse(storedTimetables);
        this.recentTimetables = [];

        timetables.forEach((timetable: any) => {
          this.timeTableService.checkTimetableExists(timetable.id,1).subscribe(exists => {
            if (exists) {
              this.recentTimetables.push(timetable);
            } else {
              console.log(`Timetable with ID ${timetable.id} no longer exists.`);
            }
          });
        });
      }
    }

    //Todo code update status by list timetable

    updateListTimetableStatus() {
      this.timeTableService.updateTimeTableStatus().subscribe(() => {
        console.log("Tất cả trạng thái bảng thời gian đã được cập nhật thành công.");
        this.loadRecentTimetables();
        this.timeTableService.reloadTimetables();
      });
    }

  viewStorage() {
    const dialogRef = this.dialog.open(StorageComponent, {
      data: {eventId: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
