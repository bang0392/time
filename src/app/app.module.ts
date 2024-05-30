import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
// import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UrlHelperService } from 'angular-oauth2-oidc';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { TokenInterceptor } from './service/token.interceptor';
import { UserComponent } from './component/user/user.component';
import { WarningComponent } from './component/warning/warning.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventDetailsComponent } from './component/dashboard/event-details/event-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgOptimizedImage } from '@angular/common';
import { ProfileComponent } from './component/user/profile/profile.component';
import { NotificationComponent } from './component/notification/notification.component';
import { NavbarServices } from './service/navbar.services';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { TimetableDetailsComponent } from './component/user/timetable/timetable-details/timetable-details.component';
import { ShowViewTimetableComponent } from './component/user/timetable/show-view-timetable/show-view-timetable.component';
import { DetailsEditTimetableComponent } from './component/user/timetable/details-edit-timetable/details-edit-timetable.component';
import { StorageComponent } from "./component/storage/storage.component";
initializeApp(environment.firebase);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    RegisterComponent,
    UserComponent,
    WarningComponent,
    EventDetailsComponent,
    ProfileComponent,
    NotificationComponent,
    TimetableDetailsComponent,
    ShowViewTimetableComponent,
    DetailsEditTimetableComponent,
    StorageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NgOptimizedImage,
    ScheduleModule
  ],
  providers: [
    OAuthService,
    UrlHelperService,
    NavbarServices,
    DatePipe,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
