import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../login-registro/user-data.service';
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { ConfigService } from 'src/app/core/config.service';
import { ApiService } from '../../core/api.service';
import { first } from 'rxjs/operators';
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
export class CalendarComponent implements OnInit {
  //ICONS
  lessThan = faLessThan;
  greaterThan = faGreaterThan;
  // data from DB
  mockupofDBresponse = [
    {
      "id_user": 2,
      "first_name": "Angel Servando",
      "last_name": "Quiñones Garcia",
      "date": "2021-11-11T00:00:00"
    },
    {
      "id_user": 10,
      "first_name": "Angel Servando",
      "last_name": "Quiñones Garcia",
      "date": "2021-11-16T00:00:00"
    },
    {
      "id_user": 2,
      "first_name": "Angel Servando",
      "last_name": "Quiñones Garcia",
      "date": "2021-11-17T00:00:00"
    },
    {
      "id_user": 2,
      "first_name": "Angel Servando",
      "last_name": "Quiñones Garcia",
      "date": "2021-11-19T00:00:00"
    },
    {
      "id_user": 18,
      "first_name": "Francisco",
      "last_name": "Albear",
      "date": "2021-11-22T00:00:00"
    },
    {
      "id_user": 29,
      "first_name": "Juanito",
      "last_name": "Mata",
      "date": "2021-11-24T00:00:00"
    },
    {
      "id_user": 25,
      "first_name": "usuario",
      "last_name": "dos qa",
      "date": "2021-11-29T00:00:00"
    },
    {
      "id_user": 24,
      "first_name": "usuario",
      "last_name": "tres QA",
      "date": "2021-11-30T00:00:00"
    },
    {
      "id_user": 27,
      "first_name": "usuario qa",
      "last_name": "cuatro",
      "date": "2021-11-30T00:00:00"
    },
    {
      "id_user": 28,
      "first_name": "Miguel An",
      "last_name": "Florentino San",
      "date": "2021-11-30T00:00:00"
    },
    {
      "id_user": 12,
      "first_name": "Alexis",
      "last_name": "Mata",
      "date": "2021-11-30T00:00:00"
    },
    {
      "id_user": 35,
      "first_name": "Mike",
      "last_name": "Florentino",
      "date": "2021-11-30T00:00:00"
    },
    {
      "id_user": 26,
      "first_name": "usuario ",
      "last_name": "uno",
      "date": "2021-11-30T00:00:00"
    },
    {
      "id_user": 21,
      "first_name": "Angel Servando",
      "last_name": "Quinones Garcia",
      "date": "2021-11-30T00:00:00"
    }
  ]
  // Semanas

  // weekends: boolean = true;

  daysOfWeekend: Array<string> = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  daysOfWeek: Array<string> = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  iteratorOfWeek: Array<string> = []

  //TODO:
  // Get today, and bind the objects of that day to show

  dayevents: objectDay = {
    day: "2022-01-22",
    events: [
      {
        date: "2022-01-13T00:00:00",
        event: false,
        first_name: "Dante",
        id_user: 12,
        last_name: "Barboza"
      }
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
    this.apiCall(1, 2022);

    // this.monthFill()
  }

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
    console.log(this.month.weeks);
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
