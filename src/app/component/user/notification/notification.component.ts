import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationServices } from 'src/app/service/notification.services';
import { SettingNoticationDTO } from './dto/settingnotification.dto';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{


  settingNofiticationDTO : SettingNoticationDTO = new SettingNoticationDTO;


  constructor(
    private notificationServices : NotificationServices,
  ){}

  ngOnInit(){
    this.getSetting();
  }
  addSetting() : void{
    
    this.notificationServices.addSetting(this.settingNofiticationDTO).subscribe(
      (response) => {
        if (response.code == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Settings saved successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    )
    
  }

  
  getSetting(){
    this.notificationServices.getSetting().subscribe((response) => {
      this.settingNofiticationDTO = response.data
      console.log(response.data)
    })
  }

}
