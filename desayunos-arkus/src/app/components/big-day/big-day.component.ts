import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-day',
  templateUrl: './big-day.component.html',
  styleUrls: ['./big-day.component.scss']
})
export class BigDayComponent implements OnInit {
@Input() date: Date =new Date();
dayNumber:number;
dayName:number;
  constructor() { }

  ngOnInit(): void {
  this.dayNumber = this.date.getDate();
  console.log(this.date)
  this.dayName = this.date.getDay();
  }

}
