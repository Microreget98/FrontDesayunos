import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from '../../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMenu } from './DialogMenu/dialog-menu.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo = {
    id_user: 18,
    first_name: "Francisco",
    last_name: "Albear"
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
    dateClick: this.handleDateClick.bind(this),
    height: "100%"
  };

  constructor(private apiService: ApiService,public dialog: MatDialog) {  }

  ngOnInit(): void {
    
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
