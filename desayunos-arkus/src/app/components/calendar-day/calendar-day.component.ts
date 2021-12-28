import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  public dayNumber: string = '28';
  public breakfasts: Array<any> = [
    { name: 'Juan 1 Juan 1' },
    { name: 'Ángel Servando Quiñones García' },
    { name: 'Juan 3 Juan 3' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.breakfasts = this.compressNames(this.breakfasts);
  }

  compressNames(breakfasts: Array<any>) {
    const newBreakfasts = [];
    for (let i = 0; i < breakfasts.length; i++) {
      const bf = breakfasts[i];
      const names = bf.name.split(' ');
      const smallName = names[0] + ' ' + names[1][0] + '.';
      newBreakfasts.push({ ...bf, name: smallName });
    }

    return newBreakfasts;
  }
}
