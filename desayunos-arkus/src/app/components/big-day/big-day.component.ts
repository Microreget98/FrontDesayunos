import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-day',
  templateUrl: './big-day.component.html',
  styleUrls: ['./big-day.component.scss']
})
export class BigDayComponent implements OnInit {
  public dayNumber: string = '29';

  constructor() { }

  ngOnInit(): void {
  }

}
