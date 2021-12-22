import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, createElement, FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from '../../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMenu } from './DialogMenu/dialog-menu.component';
import { UserDataService } from '../login-registro/user-data.service';
import { Calendar } from '@fullcalendar/core';
import { ConfigService } from 'src/app/core/config.service';
import { map } from 'rxjs/operators';
import { CalendarUsersByMonth } from './models/CalendarUsersByMonth';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const eventLoad = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

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
      left: 'prev,next,today',
      center: 'title',
      right: ''
    
    },
    initialView: 'dayGridMonth',
    initialEvents: eventLoad,
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
    eventContent: function (arg) {
      let image = document.createElement('img');
      let div = document.createElement('span');
      image.src = arg.event.extendedProps.imgUrl;
      image.width = 20;
      image.height = 20;
      div.innerText = arg.event.extendedProps.fullName;
      let arrayOfDomNodes = [image, div];
      return { domNodes: arrayOfDomNodes };
    },
    events: [
      eventLoad
    ]
  };

  constructor(
    public dialog: MatDialog,
    private userData: UserDataService,
    private apiService: ApiService,
    private configService: ConfigService,
    private router: Router
  ) {


  }

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
    this.loadCalendarInfo();
    this.options.dayMaxEvents = 4;

  }

  loadCalendarInfo() {
    let calendarEl;
    var calendar = new Calendar(calendarEl, {
      timeZone: 'local',
    });
    let month: number = calendar.view.currentStart.getMonth() + 1;
    let year: number = calendar.view.currentStart.getFullYear();

    const apiUrl = `${this.configService.config.apiUrl}/api/Calendar/GetRegisterUsersByMonth?month=${month}&year=${year}`

    this.apiService.GetData(apiUrl).pipe(
      map((res: CalendarUsersByMonth[]) => {
        res.forEach(usr => {
          eventLoad.push(
            {
              title: 'user',
              date: usr.date,
              backgroundColor: 'white',
              textColor: 'black',
              borderColor: 'white',
              extendedProps: {
                fullName: usr.first_name + " " + usr.last_name,
                imgUrl: "../../../assets/img/icons8-user-64.png"
              }
            }
          );
        });
        this.isLoading = false;
      })
    ).subscribe();
  }

  handleDateClick(info) {
    const dialogRef = this.dialog.open(DialogMenu, {
      width: '800px',
      height: '500px',
      data: { dateStr: info.dateStr, firstName: this.userInfo.first_name, lastName: this.userInfo.last_name, userId: this.userInfo.id_user }
    }).afterClosed().subscribe((res) => {
      this.loadCalendarInfo();
    }
    );

  }
}
