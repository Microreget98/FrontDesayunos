import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from '../../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMenu } from './DialogMenu/dialog-menu.component';
import { UserDataService } from '../login-registro/user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo = {
    id_user: 0,
    first_name: '',
    last_name: ''
  }

  // isAdmin=this.userData.getUserType();
 

  // userInfo = {
  //   id_user: 2,
  //   first_name: 'Angel Servando',
  //   last_name: 'Quiñones Garcia'
  // }

  options: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(public dialog: MatDialog, private userData: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.userData.ngOnInit();
    if (this.userData.userDataString !== '') {
      let parsedData = JSON.parse(this.userData.userDataString);
      this.userInfo = {
        id_user: parsedData.id_user,
        first_name: parsedData.first_name,
        last_name: parsedData.last_name
      }
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  handleDateClick(info) {
    const dialogRef = this.dialog.open(DialogMenu, {
      width: '800px',
      height: '500px',
      data: { dateStr: info.dateStr, firstName: this.userInfo.first_name, lastName: this.userInfo.last_name, userId: this.userInfo.id_user }
    });
  }

}
