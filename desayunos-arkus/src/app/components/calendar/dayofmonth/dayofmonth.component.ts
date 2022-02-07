import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

export interface User{
  first_name: string,
  last_name:string,
  id_user:number,
  date: string,
  event: boolean
}

@Component({
  selector: 'app-dayofmonth',
  templateUrl: './dayofmonth.component.html',
  styleUrls: ['./dayofmonth.component.scss']
})
export class DayofmonthComponent implements OnInit, OnChanges, DoCheck {

  @Input("dayData") dayData;
  @Input("dayNumber") dayNumber: any;

  dayPreview: User[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("onchanges")
    // this.temporalFunction(changes.day.currentValue);
  }

  ngDoCheck(): void {
    // console.log("AfterContentChecked");
    this.temporalFunction();
  }

  temporalFunction() {
    // console.log(this.dayData)
    if(this.dayData.length>=1){
      this.dayPreview = [...this.dayData]
      if(this.dayPreview.length>=3) this.dayPreview.length = 3
      // console.log(this.dayPreview[0])
      console.log("check")
    }
  }

  ngOnInit(): void {
    // this.temporalFunction()
    // console.log("On init");
  }

}
