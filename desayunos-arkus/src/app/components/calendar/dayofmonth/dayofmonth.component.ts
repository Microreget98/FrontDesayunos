import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dayofmonth',
  templateUrl: './dayofmonth.component.html',
  styleUrls: ['./dayofmonth.component.scss']
})
export class DayofmonthComponent implements OnInit, OnChanges, AfterViewInit {

  @Input("dayInfo") 
  get day():Object { return this._day}
  set day(day: Object){
    this._day = day
  };

  private _day: Object;

  previewOfDay: Array<any> = []
  dayAllData: Array<any> = []
  dayNumber: string

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("onchanges")
    // this.temporalFunction(changes.day.currentValue);
  }

  ngAfterViewInit(): void {
    // console.log("AfterContentChecked");
    // this.temporalFunction();
  }

  async temporalFunction(changes?) {
    console.log(this._day)
    this.dayAllData = this._day["value"];
    this.dayNumber = this._day["key"];
    let previewData = [await this.dayAllData[0], await this.dayAllData[1], await this.dayAllData[2]]
    console.log(this.dayNumber, { ...previewData }, this.dayAllData);
  }

  ngOnInit(): void {
    this.temporalFunction()
    // console.log("On init");
  }

}
