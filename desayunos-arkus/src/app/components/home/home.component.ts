import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from '../../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMenu } from './DialogMenu/dialog-menu.component';
import { UserDataService } from '../login-registro/user-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userInfo = {
    id_user: this.userData.userData[0].id_user,
    first_name: this.userData.userData[0].first_name,
    last_name: this.userData.userData[0].last_name
  }

isAdmin=this.userData.getUserType();



  options: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
    height: "100%"
  };

  constructor(public dialog: MatDialog, private userData: UserDataService) {  }

  ngOnInit(): void {
    // console.log(this.userdata)
    console.log(this.isAdmin);
  }

  handleDateClick(info){
    console.log(info.dateStr);
    const dialogRef = this.dialog.open(DialogMenu, {
      width: '800px',
      height: '500px',
      data: {dateStr: info.dateStr, firstName: this.userInfo.first_name, lastName: this.userInfo.last_name, userId: this.userInfo.id_user}
    });
  }

}
