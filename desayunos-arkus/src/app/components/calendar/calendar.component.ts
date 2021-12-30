import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() monthBreakFasts: any;

  year: number = 2022;
  // January is 0 based
  month: number = 3;

  dateSpan: Array<Date>;

  constructor() {}

  ngOnInit(): void {
    this.dateSpan = this.getDateSpan(this.month, this.year);
    console.log('datespan', this.dateSpan);
  }

  getDateSpan(month: number, year: number) {
    const dateSpan = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekDay = new Date(year, month, 1).getDay();
    const lastWeekDay = new Date(year, month, daysInMonth).getDay();

    dateSpan.push(new Date(year, month, 2 - firstWeekDay));
    dateSpan.push(new Date(year, month, daysInMonth + 5 - lastWeekDay));

    return dateSpan;
  }
}
