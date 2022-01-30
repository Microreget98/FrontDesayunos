import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

export interface objectDay {
  day: string,
  events: Array<user>
}
export interface user {
  id_user: number,
  first_name: string,
  last_name: string,
  date: string,
  event: boolean
}


@Component({
  selector: 'app-bigday',
  templateUrl: './bigday.component.html',
  styleUrls: ['./bigday.component.scss']
})
export class BigdayComponent implements OnInit, OnChanges {

  @Input("eventInfo") eventsday: objectDay

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    // console.log(this.eventsday)
  }

}
