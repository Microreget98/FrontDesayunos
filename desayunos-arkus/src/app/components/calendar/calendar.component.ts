import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../login-registro/user-data.service';
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { first } from 'rxjs/operators';
//TODO
// props of this component
//  weekends: true -> { 0:[], 1: [], 2: [], 3: [], 4: [], 5: [], 6:[] } or false -> { 1: [], 2: [], 3: [], 4: [], 5: [] }
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
  // TODO
  // order data by date
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

  month = {
    "numberOfMonth": 0,
    weeks: []
  };

  constructor(
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.userDataService.ngOnInit();
    this.buildMonth(false, 2022, 1);

    // this.prueba(2021, 11);
  }

  buildMonth(weekends: boolean, year?, month?, day?) {
    // this.month.weeks.push("p")
    let actualMonth = new Date(year, month + 1, 0)
    let firstDayMonth = new Date(year, month, 1)
    let numberOfDays = firstDayMonth.getDay() + actualMonth.getDate() + (6 - actualMonth.getDay())
    firstDayMonth.setDate(0 - (firstDayMonth.getDay() - 1))
    let dateStr: string;
    let j = 0;
    let obj = {}
    for (let i = 0; i <= numberOfDays; i++) {
      if ((firstDayMonth.getDay() != 0 && firstDayMonth.getDay() != 6) || !weekends) {
        let additionobj = {}
        dateStr = firstDayMonth.toISOString().split('T')[0];
        additionobj[dateStr] = []
        obj = Object.assign(obj, additionobj);
        j += 1;
      }
      if (j === 5 || j === 6) {
        this.month.weeks.push(obj)
        j = 0; i -= 1;
        obj = {}
      }
      firstDayMonth.setDate(firstDayMonth.getDate() + 1);
    }
    console.log(this.month.weeks);
    this.month.weeks.forEach(x => console.log(x));
  }

  prueba(year?: number, month?: number) {
    if (year && month) {
      let date = new Date(year, month, 0);
      let iterator = 0;
      this.month["numberOfMonth"] = date.getMonth();
      this.mockupofDBresponse.forEach(obj => {
        let day = new Date(obj.date);
        this.month.weeks[iterator][day.getDay()].push(obj);

        // if (day.getDay() > 5) {
        //   rangeofDays += 7;
        //   iterator += 1;
        // }
      })
    }
    console.log(this.month)
  }

  private getWeekNumber(year?: number, month?: number, day?: number) {
    let currdate = new Date(year, month, day)
    let firstyearday = new Date(currdate.getFullYear(), 0, 1);
    let numberofdays = Math.floor((currdate.getTime() - firstyearday.getTime()) / 86400000)
    return Math.ceil((currdate.getDay() + 1 + numberofdays) / 7);
  }
}
