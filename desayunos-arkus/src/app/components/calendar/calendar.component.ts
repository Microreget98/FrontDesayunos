import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { UserDataService } from '../login-registro/user-data.service';
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { ConfigService } from 'src/app/core/config.service';
import { ApiService } from '../../core/api.service';
//TODO
// props of this component
//  weekends: true -> { 0:[], 1: [], 2: [], 3: [], 4: [], 5: [], 6:[] } or false -> { 1: [], 2: [], 3: [], 4: [], 5: [] }

export interface objectDay {
  day: string,
  events: Array<user>
}
export interface user {
  id_user: number,
  first_name: string,
  last_name: string,
  date: string,
  event: boolean
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterContentInit {
  //ICONS
  lessThan = faLessThan;
  greaterThan = faGreaterThan;
  // Semanas
  lifecycledata = []
  // weekends: boolean = true;

  daysOfWeekend: Array<string> = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  daysOfWeek: Array<string> = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  iteratorOfWeek: Array<string> = []

  //TODO:
  // Get today, and bind the objects of that day to show

  dayevents: objectDay = {
    day: new Date().toISOString().split("T")[0],
    events: [

    ]
  }

  month = {
    "numberOfMonth": 0,
    weeks: []
  };

  constructor(
    private userDataService: UserDataService,
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.userDataService.ngOnInit();
    this.buildMonth(false, 2022, 0);

    // this.monthFill()
  }

  // ngAfterViewChecked(): void {
  //   let temp1 = { ...this.month }
  //   this.lifecycledata.push({ "ViewChecked": {...this.month} })
  //   console.log("After view Checked", this.lifecycledata);
  // }

  ngAfterContentInit(): void {
    this.apiCall(1, 2022);
  }

  // ngAfterContentChecked(): void {
  //   let temp3 = { ...this.month }
  //   this.lifecycledata.push({ "ContentChecked": {...this.month} })
  //   console.log("After content checked", this.lifecycledata);
  // }

  dayClick(event: any) {
    let eventInfo: objectDay = {
      day: event.key,
      events: event.value
    }
    this.dayevents = eventInfo
  }

  buildMonth(weekends: boolean, year?, month?) {
    this.iteratorOfWeek = weekends ? this.daysOfWeekend : this.daysOfWeek;
    let actualMonth = new Date(year, month + 1, 0)
    let day0OfMonth = new Date(year, month, 1)
    let numberOfDaysInMonth = day0OfMonth.getDay() + actualMonth.getDate() + (6 - actualMonth.getDay())
    day0OfMonth.setDate(0 - (day0OfMonth.getDay() - 1))
    let dateInString: string;
    let obj = {};
    for (let i = 0; i <= numberOfDaysInMonth; i++) {
      if ((day0OfMonth.getDay() >= 1 && day0OfMonth.getDay() <= 5) || weekends) {
        let additionobj = {}
        dateInString = day0OfMonth.toISOString().split('T')[0];
        additionobj[dateInString] = []
        obj = Object.assign(obj, additionobj);
      }
      if ((!weekends && day0OfMonth.getDay() === 5) || (weekends && day0OfMonth.getDay() === 6)) {
        this.month.weeks.push(obj);
        obj = {};
      }
      day0OfMonth.setDate(day0OfMonth.getDate() + 1);
    }
  }

  monthFill(res) {
    let cycles = this.month.weeks.length
    // console.log(this.month.weeks);
    let cache = {
      day: "",
      index: 0
    }
    res.forEach(obj => {
      let day = obj.date.split('T')[0];
      if (cache.day === day) {
        this.month.weeks[cache.index][day].push(obj);
      }
      else {
        for (let index = cache.index; index < cycles; index++) {
          if (Object.keys(this.month.weeks[index]).some(x => x === day)) {
            this.month.weeks[index][day].push(obj);
            cache.index = index
            cache.day = day
            break;
          }
        }
      }
    })
    console.log(this.month.weeks);
  }

  apiCall(month?: number, year?: number) {
    const apiUrl = `${this.configService.config.apiUrl}/api/Calendar/GetRegisterUsersByMonth?month=${month}&year=${year}`;
    this.apiService.GetData(apiUrl).subscribe(
      (res) => {
        this.monthFill(res);
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
