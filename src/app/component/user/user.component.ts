import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/service/auth-google.service';
import { UserService } from 'src/app/service/user.service';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from 'src/app/AppConstants';
import { UserDetailsDTO } from './profile/dto/user.user-details.dto';
import { FriendDTO } from './profile/dto/friend.dto';
import { el, th } from 'date-fns/locale';
import { NotificationServices } from 'src/app/service/notification.services';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userProfile: any;

  email = this.cookieService.get('userEmail');

  id = this.cookieService.get('userId');


  anh !: string;
  avatarUrl!: string;

  dropdownOpen = false;
  dropdownOpen1 = false;
  dropdownOpen2 = false;

  isArrowRight = false;
  isArrow1Right = false;
  isArrow2Right = false;

  isEventDetailsOpen: boolean = false;

  isTimetableListOpened: boolean = false;

  isMenuCollapsed: boolean = false;

  isCheckTimeTable: boolean = false;

  selectedTab: string = 'cai-dat-chung';

  lang !: string;

  formats: string[] = [];

  countries: string[] = [];
  selectedTabSlideBar: string = 'setting';

  selectedTabPosition: any = { left: '0px', width: '58px' };

  searchText: string = '';

  selectedLanguage: string = 'Vietnam';

  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
    private languageService: AppComponent,
    private cookieService: CookieService,
    private translate: TranslateService,
    private notificationServices: NotificationServices,
  ) {
    this.userProfile = this.authGoogleService.getProfile();
    translate.setDefaultLang('vi');
    this.getAvatarUrl();
  }

  ngOnInit(): void {
    this.validateCookie();
    this.loadDataLanguages();
    this.loadLanguages();
    this.loadCountries();
  }

  getAvatarUrl() {
    this.avatarUrl = this.cookieService.get("avatarURL");
  }

  validateCookie() {
    if (!this.cookieService.get("isLoggedIn")) {
      this.router.navigate(['']);
    }
  }

  loadDataLanguages() {
    this.userService.getAvailableLanguages().subscribe(
      (response: any) => {
        this.formats = response.data;

        this.languageService.updateLanguage(this.formats[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadLanguages() {
    this.userService.loadLanguages().subscribe(
      (response: any) => {
        console.log(response);
        this.lang = response;
        this.translate.use(this.lang);
      }
    );
  }

  loadCountries() {
    this.userService.getCountries().subscribe(
      (response: any[]) => {
        this.countries = response.map(country => country.name.common);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterCountries(): string[] {
    return this.countries.filter(country =>
      country.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleDropdown1() {
    this.dropdownOpen1 = !this.dropdownOpen1;
  }

  toggleDropdown2() {
    this.dropdownOpen2 = !this.dropdownOpen2;
  }

  updateSelectedLanguage(selectedLanguage: string) {
    this.selectedLanguage = selectedLanguage;
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {

    console.log('isArrow = '+ this.isArrowRight + ' isArrow1 = '+ this.isArrow1Right + ' isArrow2 = '+ this.isArrow2Right);
      if (!event.target.closest('.ngon-ngu-cbb')) {
          this.dropdownOpen = false;
          this.dropdownOpen1 = false;
          this.dropdownOpen2 = false;
          if(this.isArrow2Right == true){
            this.toggleArrow2(); 
            this.isArrow2Right = false;
          }
          if(this.isArrow1Right == true){
            this.toggleArrow1();
            this.isArrow1Right = false; 
          }
          if(this.isArrowRight == true){
            this.toggleArrow(); 
            this.isArrowRight = false;
          }
      }
  }

  toggleArrow() {
    const arrow = document.querySelector('.arrow');
    if (arrow) {
      arrow.classList.toggle('active');
      this.isArrowRight = true;
    }
    if(this.isArrowRight == false){
      this.isArrowRight = true;
    }
  }
  
  toggleArrow1() {
    const arrow1 = document.querySelector('.arrow1');
    if (arrow1) {
      arrow1.classList.toggle('active');
    }
    if(this.isArrow1Right == false){
      this.isArrow1Right = true;
    }
  }  

  toggleArrow2() {
    const arrow2 = document.querySelector('.arrow2');
    if (arrow2) {
      arrow2.classList.toggle('active');
    }
    if(this.isArrow2Right == false){
      this.isArrow2Right = true;
    }
  }  

  nganChanSuKien(suKien: Event): void {
    suKien.stopPropagation();
  }


  search() { }

  moveToCalendar() { }

  openTimetableList() {
    this.isTimetableListOpened = !this.isTimetableListOpened;
  }

  moveToNotification() { }

  moveToSetting() { }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isTimetableListOpened = false;
  }

  handleToggleMenuEvent() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isTimetableListOpened = false;
  }

  selectHoSo() {
    this.selectedTab = 'ho-so';
    this.selectedTabPosition = { left: '0px', width: '58px' };
  }

  selectCaiDatChung() {
    this.selectedTab = 'cai-dat-chung';
    this.selectedTabPosition = { left: '78px', width: '152px' };
  }


  activeTab: number = 1;

  isActive(tabNumber: number): boolean {
    return this.activeTab === tabNumber;
  }

  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }


  onCountryChange(event: Event) {

    const lang = this.lang;

    const selectedCountry = (event.target as HTMLSelectElement)?.value;
    if (selectedCountry) {
      this.languageService.updateLanguage(selectedCountry);
    }

    this.userService.setLanguageForUser(lang).subscribe(
      (response: any) => {
        console.log(response.data);
      },
      (error) => {
        console.error(error.data);
      }
    );
  }

  selectLanguage(format: string) {
    this.lang = format;
    this.dropdownOpen = false;

    this.languageService.updateLanguage(format);

    this.userService.setLanguageForUser(format).subscribe(
      (response: any) => {
        console.log(response.data);
      },
      (error) => {
        console.error(error.data);
      }
    );
  }
}
