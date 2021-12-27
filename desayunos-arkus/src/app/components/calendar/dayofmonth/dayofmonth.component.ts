import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dayofmonth',
  templateUrl: './dayofmonth.component.html',
  styleUrls: ['./dayofmonth.component.scss']
})
export class DayofmonthComponent implements OnInit {

  weeks = [
    {
      0:[],
      1:[{}],
      2:[{}],
      3:[{}],
      4:[{}],
      5:[{}],
      6:[]
    }
  ]

  @Input() data: Array<any>

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

}
