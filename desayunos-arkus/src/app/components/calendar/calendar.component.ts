import { Component, Input, OnInit } from '@angular/core';
import { Breakfast } from '../home/models/Breakfast';
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
  @Input() handleDayClick: (param: number) => void = (day: number) => {
    console.log(`click desde el día ${day}`);
  };

  dateSpan: Array<Date>;
  days: Array<Day>;

  constructor() {}

  ngOnInit(): void {
    this.dateSpan = this.getDateSpan(this.month, this.year);
    this.createDays(this.dateSpan);
  }

  createDays(dateSpan: Array<Date>) {
    const days = [];
    const [d0, dF] = dateSpan;

    // Initiate the days
    for (let day = d0; day <= dF; day.setDate(day.getDate() + 1)) {
      if (day.getDay() === 0 || day.getDay() === 6) continue;
      days.push({
        date: new Date(day.getTime()),
      });
    }

    this.days = days;

    let remainingBreakfasts = [...this.monthsBreakFasts];
    for (let day of this.days) {
      // Insert the breakfasts
      day.breakfasts = [];
      for (let i = remainingBreakfasts.length - 1; i >= 0; i--) {
        const bf = remainingBreakfasts[i];

        if (bf.date.getTime() !== day.date.getTime()) continue;
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
