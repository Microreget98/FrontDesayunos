import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from '../../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMenu } from './DialogMenu/dialog-menu.component';
import { LoginRegistroComponent } from '../login-registro/login-registro.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @Input() userdata: LoginRegistroComponent;

  userInfo = {
    id_user: 18,
    first_name: "",
    last_name: ""
  }

  options: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(private apiService: ApiService,public dialog: MatDialog) {  }

  ngOnInit(): void {
    // console.log(this.userdata)
  }

  getUserInfo(userData){
    this.userInfo = {
      id_user: userData.id_user,
      first_name: userData.first_name,
      last_name: userData.last_name,
    }
    console.log()
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
