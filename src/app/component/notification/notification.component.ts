import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  isTimetableListOpened: boolean = false;

  isMenuCollapsed: boolean = false;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isTimetableListOpened = false;
  }

  handleToggleMenuEvent() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isTimetableListOpened = false;
  }
}