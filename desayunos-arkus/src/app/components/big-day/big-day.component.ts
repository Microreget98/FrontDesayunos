import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-big-day',
  templateUrl: './big-day.component.html',
  styleUrls: ['./big-day.component.scss'],
})
export class BigDayComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
}
