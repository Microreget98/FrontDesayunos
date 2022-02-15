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
export class DayofmonthComponent implements OnInit, DoCheck {

  @Input("dayData") dayData;
  @Input("dayNumber") dayNumber: any;

  dayPreview: User[] = []

  constructor() { }

  ngDoCheck(): void {
    this.temporalFunction();
  }

  temporalFunction() {
    if(this.dayData.length>=1){
      this.dayPreview = [...this.dayData]
      if(this.dayPreview.length>=3) this.dayPreview.length = 3
    }
  }

  ngOnInit(): void {
    // this.temporalFunction()
    // console.log("On init");
  }

}
