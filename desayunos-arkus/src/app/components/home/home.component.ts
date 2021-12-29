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
  dayNumber = '29';
  dayName= 'Miércoles';

  constructor() {}


  ngOnInit(): void {}

}
