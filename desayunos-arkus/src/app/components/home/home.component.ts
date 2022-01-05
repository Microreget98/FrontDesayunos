import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../login-registro/user-data.service';
import { Router } from '@angular/router';
import { UserData } from './models/UserData';
import { Breakfast } from './models/Breakfast';
import { ConfigService } from 'src/app/core/config.service';
import { ApiService } from 'src/app/core/api.service';
import { CalendarUsersByMonth } from './models/CalendarUsersByMonth';
import { map } from 'rxjs/operators';
import { FestiveDay } from './models/FestiveDay';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Breakfasts of the past, present and next month
  monthsBreakFasts: Array<Breakfast> = [];

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedDay: any = {
    date: new Date(),
    breakfasts: [],
  };

  festiveDays: Array<FestiveDay> = [
    // USA
    {
      year: 2022,
      month: 0,
      day: 17,
      type: 2,
    },
    {
      year: 2022,
      month: 1,
      day: 21,
      type: 2,
    },
    {
      year: 2022,
      month: 4,
      day: 30,
      type: 2,
    },
    {
      year: 2022,
      month: 5,
      day: 20,
      type: 2,
    },
    {
      year: 2022,
      month: 6,
      day: 4,
      type: 2,
    },
    {
      year: 2022,
      month: 8,
      day: 5,
      type: 2,
    },
    {
      year: 2022,
      month: 9,
      day: 10,
      type: 2,
    },
    {
      year: 2022,
      month: 10,
      day: 11,
      type: 2,
    },
    {
      year: 2022,
      month: 10,
      day: 24,
      type: 2,
    },
    {
      year: 2022,
      month: 11,
      day: 26,
      type: 2,
    },
    // MX
    {
      year: 2022,
      month: 1,
      day: 1,
      type: 1,
    },
    {
      year: 2022,
      month: 2,
      day: 15,
      type: 1,
    },
    {
      year: 2022,
      month: 3,
      day: 1,
      type: 1,
    },
    {
      year: 2022,
      month: 4,
      day: 2,
      type: 1,
    },
    {
      year: 2022,
      month: 8,
      day: 16,
      type: 1,
    },
    {
      year: 2022,
      month: 10,
      day: 15,
      type: 1,
    },
  ];

  userInfo: UserData = {
    id: 0,
    firstName: '',
    lastName: '',
  };

  constructor(
    private userData: UserDataService,
    private router: Router,
    private configService: ConfigService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.monthsBreakFasts = [];
    await this.getMonthBreakfasts();

    this.updateSelectedDay(this.selectedDay);

    this.userData.ngOnInit();
    if (this.userData.userDataString !== '') {
      let parsedData = JSON.parse(this.userData.userDataString);
      this.userInfo = {
        id: parsedData.id_user,
        firstName: parsedData.first_name,
        lastName: parsedData.last_name,
      };
    } else {
      this.router.navigate(['/login']);
    }
  }

  async getMonthBreakfasts() {
    const months = [
      {
        year:
          this.selectedMonth === 0 ? this.selectedYear - 1 : this.selectedYear,
        month: this.selectedMonth === 0 ? 12 : this.selectedMonth,
      },
      {
        year: this.selectedYear,
        month: this.selectedMonth + 1,
      },
      {
        year:
          this.selectedMonth === 11 ? this.selectedYear + 1 : this.selectedYear,
        month: this.selectedMonth === 11 ? 1 : this.selectedMonth + 2,
      },
    ];

    for (const month of months) {
      const apiUrl = `${this.configService.config.apiUrl}/api/Calendar/GetRegisterUsersByMonth?month=${month.month}&year=${month.year}`;
      await this.apiService
        .GetData(apiUrl)
        .pipe(
          map((res: CalendarUsersByMonth[]) => {
            res.forEach((usr) => {
              this.monthsBreakFasts.push({
                date: new Date(usr.date),
                firstName: usr.first_name,
                lastName: usr.last_name,
                userId: usr.id_user,
                event: usr.event,
              });
            });
          })
        )
        .toPromise();
    }
  }

  updateSelectedDay(e) {
    // Get the breakfasts from monthsBreakfasts
    const breakfasts = [];

    for (const bf of this.monthsBreakFasts.filter(
      (bf) =>
        bf.date.toISOString().slice(0, 10) === e.date.toISOString().slice(0, 10)
    )) {
      breakfasts.push(bf);
    }

    // Change the selectedDay.date
    this.selectedDay = {
      date: e.date,
      breakfasts: breakfasts,
    };
  }

  handleMonthChange(plusMinus: number) {
    if (plusMinus >= 0) {
      this.selectedYear =
        this.selectedMonth === 11 ? this.selectedYear + 1 : this.selectedYear;
      this.selectedMonth =
        this.selectedMonth === 11 ? 0 : this.selectedMonth + 1;
    }

    if (plusMinus < 0) {
      this.selectedYear =
        this.selectedMonth === 0 ? this.selectedYear - 1 : this.selectedYear;
      this.selectedMonth =
        this.selectedMonth === 0 ? 11 : this.selectedMonth - 1;
    }

    this.ngOnInit();
  }
}
