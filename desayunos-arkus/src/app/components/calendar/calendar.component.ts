import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from 'src/app/core/config.service';
import { Breakfast } from '../home/models/Breakfast';
import { CalendarUsersByMonth } from '../home/models/CalendarUsersByMonth';
import { Day } from '../home/models/Day';
import { FestiveDay } from '../home/models/FestiveDay';
import { UserData } from '../home/models/UserData';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // Breakfasts of the past, present and next month
  @Input() monthsBreakFasts: Array<Breakfast> = [];
  @Input() year: number = new Date().getFullYear();
  @Input() month: number = new Date().getMonth(); // 0 based January

  @Input() userData: UserData;
  @Input() festiveDays: Array<FestiveDay> = [];

  @Output() dayClicked = new EventEmitter<any>();

  monthName: string = '';

  dateSpan: Array<Date>;
  days: Array<Day>;

  constructor(
    private configService: ConfigService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.monthName = new Date(this.year, this.month).toLocaleString('es-MX', {
      month: 'long',
    });
    this.dateSpan = this.getDateSpan(this.month, this.year);
    this.monthsBreakFasts = [];
    await this.getMonthBreakfasts();
    this.createDays();
  }

  handleMonthChange(plusMinus: number) {
    console.log('this month', this.month);
    console.log('this year', this.year);

    if (plusMinus >= 0) {
      this.year = this.month === 11 ? this.year + 1 : this.year;
      this.month = this.month === 11 ? 0 : this.month + 1;
    }

    if (plusMinus < 0) {
      this.year = this.month === 0 ? this.year - 1 : this.year;
      this.month = this.month === 0 ? 11 : this.month - 1;
    }

    this.ngOnInit();
  }

  handleDayClick(e: any) {
    this.dayClicked.emit(e);
  }

  async getMonthBreakfasts() {
    const months = [
      {
        year: this.month === 0 ? this.year - 1 : this.year,
        month: this.month === 0 ? 12 : this.month,
      },
      {
        year: this.year,
        month: this.month + 1,
      },
      {
        year: this.month === 11 ? this.year + 1 : this.year,
        month: this.month === 11 ? 1 : this.month + 2,
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
              });
            });
          })
        )
        .toPromise();
    }
  }

  createDays() {
    const days = [];
    const [d0, dF] = this.dateSpan;

    // Initiate the days
    for (let day = d0; day <= dF; day.setDate(day.getDate() + 1)) {
      if (day.getDay() === 0 || day.getDay() === 6) continue;
      days.push({
        date: new Date(day.getTime()),
      });
    }

    this.days = days;

    const remainingBreakfasts = [...this.monthsBreakFasts];

    for (let day of this.days) {
      // Insert the breakfasts
      day.breakfasts = [];
      for (let i = remainingBreakfasts.length - 1; i >= 0; i--) {
        const bf = remainingBreakfasts[i];
        const bfDate = {
          year: bf.date.getFullYear(),
          month: bf.date.getMonth(),
          day: bf.date.getDate(),
        };
        const dayDate = {
          year: day.date.getFullYear(),
          month: day.date.getMonth(),
          day: day.date.getDate(),
        };

        if (bfDate.year !== dayDate.year) continue;
        if (bfDate.month !== dayDate.month) continue;
        if (bfDate.day !== dayDate.day) continue;

        day.breakfasts.push(bf);
        remainingBreakfasts.splice(i, 1);
      }

      // Insert the festive type
      const festiveDay = this.festiveDays.find(
        (festiveDay) =>
          festiveDay.day === day.date.getDate() &&
          festiveDay.month === day.date.getMonth() &&
          festiveDay.year === day.date.getFullYear()
      );

      if (typeof festiveDay === 'undefined') {
        day.festiveType = 0;
        continue;
      }

      day.festiveType = festiveDay.type;
    }
  }

  getDateSpan(month: number, year: number) {
    const dateSpan = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekDay = new Date(year, month, 1).getDay();
    const lastWeekDay = new Date(year, month, daysInMonth).getDay();

    const day0 =
      firstWeekDay !== 6
        ? new Date(year, month, 2 - firstWeekDay)
        : new Date(year, month, 3);

    const dayF =
      lastWeekDay !== 0
        ? new Date(year, month, daysInMonth + 5 - lastWeekDay)
        : new Date(year, month, daysInMonth - 2);

    dateSpan.push(day0);
    dateSpan.push(dayF);

    return dateSpan;
  }
}
