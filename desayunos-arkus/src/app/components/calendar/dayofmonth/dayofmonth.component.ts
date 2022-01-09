import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dayofmonth',
  templateUrl: './dayofmonth.component.html',
  styleUrls: ['./dayofmonth.component.scss']
})
export class DayofmonthComponent implements OnInit {

  @Input("dayInfo") day: Object

  constructor() { }

  ngOnInit(): void {
    // console.log(this.day['value']);
    // console.log(this.day['key']);

  }

}
