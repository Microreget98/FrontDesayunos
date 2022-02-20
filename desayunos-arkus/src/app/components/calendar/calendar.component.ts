import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../login-registro/user-data.service';
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { ConfigService } from 'src/app/core/config.service';
import { ApiService } from '../../core/api.service';
import { from, Subject } from 'rxjs';
import { User } from './models/UserModel';
//TODO
// props of this component
//  weekends: true -> { 0:[], 1: [], 2: [], 3: [], 4: [], 5: [], 6:[] } or false -> { 1: [], 2: [], 3: [], 4: [], 5: [] }

export interface objectDay {
  day: string,
  events: Array<User>
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  //ICONS
  lessThan = faLessThan;
  greaterThan = faGreaterThan;
  // Semanas
  lifecycledata = []
  // weekends: boolean = true;

  daysOfWeekend: Array<string> = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  daysOfWeek: Array<string> = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  iteratorOfWeek: Array<string> = []

  dayevents: objectDay = {
    day: new Date().toISOString().split("T")[0],
    events: []
  }

  month = {};
  daysInMonth = [];
  monthName = new Date().toLocaleDateString('es-MX', {month: 'long', year: 'numeric'});
  today = new Date();
  monthNumber = this.today.getMonth();
  monthToRender: Date = new Date();

  constructor(
    private userDataService: UserDataService,
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.userDataService.ngOnInit();
    this.buildMonth(false, this.today.getFullYear(), this.today.getMonth());
    this.apiCall(this.today.getFullYear(), this.today.getMonth())
  }

  //TODO
  // Logic to change safely months and years
  changeNextMonth(){
    this.monthNumber += 1;
    this.monthToRender.setMonth(this.monthNumber);
    this.monthName = this.monthToRender.toLocaleDateString('es-MX', {month: 'long', year: 'numeric'})
    this.buildMonth(false, this.monthToRender.getFullYear(), this.monthToRender.getMonth())
    this.apiCall(this.monthToRender.getFullYear(), this.monthToRender.getMonth())
    console.log(this.month)
  }
  
  changePreviousMonth(){
    this.monthNumber -= 1;
    this.monthToRender.setMonth(this.monthNumber);
    this.monthName = this.monthToRender.toLocaleDateString('es-MX', {month: 'long', year: 'numeric'})
    this.buildMonth(false, this.monthToRender.getFullYear(), this.monthToRender.getMonth())
    this.apiCall(this.monthToRender.getFullYear(), this.monthToRender.getMonth())
  }
  
  changeTodayMonth(){
    this.monthNumber = this.today.getMonth();
    this.monthToRender.setMonth(this.monthNumber);
    this.monthName = this.monthToRender.toLocaleDateString('es-MX', {month: 'long', year: 'numeric'})
    this.buildMonth(false, this.monthToRender.getFullYear(), this.monthToRender.getMonth())
    this.apiCall(this.monthToRender.getFullYear(), this.monthToRender.getMonth())
  }

  dayClick(event: string) {
    let eventInfo: objectDay = {
      day: event + "T00:00:00",
      events: this.month[event]
    }
    this.dayevents = eventInfo
  }

  buildMonth(weekends: boolean, year?, month?) {
    this.month = {};
    this.daysInMonth = [];
    this.iteratorOfWeek = weekends ? this.daysOfWeekend : this.daysOfWeek;
    let day0OfMonth = new Date(year, month, 1)
    day0OfMonth.setDate(0 - (day0OfMonth.getDay() - 1))
    let dateInString: string;
    for (let i = 0; i <= 42; i++) {
      if (!(day0OfMonth.getDay() === 0 || day0OfMonth.getDay() === 6)) {
        dateInString = day0OfMonth.toISOString().split('T')[0];
        Object.assign(this.month, { [dateInString]: [] });
      }
      day0OfMonth.setDate(day0OfMonth.getDate() + 1);
    }
    this.daysInMonth = Object.keys(this.month);
  }

  apiCall(year?: number, month?: number) {
    const apiUrl = `${this.configService.config.apiUrl}/api/Calendar/GetRegisterUsersByMonth?month=${month + 1}&year=${year}`;
    this.apiService.GetData(apiUrl).subscribe(
      (res: User[]) => {
        res.forEach((register) => {
          this.month[register.date.split('T')[0]].push(register)
        })
      },
      (error) => {

      }
    )
  }

  private getWeekNumber(year?: number, month?: number, day?: number) {
    let currdate = new Date(year, month, day)
    let firstyearday = new Date(currdate.getFullYear(), 0, 1);
    let numberofdays = Math.floor((currdate.getTime() - firstyearday.getTime()) / 86400000)
    return Math.ceil((currdate.getDay() + 1 + numberofdays) / 7);
  }
}
