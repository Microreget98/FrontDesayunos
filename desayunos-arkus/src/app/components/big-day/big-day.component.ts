import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-day',
  templateUrl: './big-day.component.html',
  styleUrls: ['./big-day.component.scss'],
})
export class BigDayComponent implements OnInit {
  @Input() date: Date = new Date();
  dayNumber: number;
  weekDayName: string;
  constructor() {}

  ngOnInit(): void {
    this.dayNumber = this.date.getDate();
    this.weekDayName = this.date.toLocaleDateString('es-MX', {
      weekday: 'long',
    });
  }
}
