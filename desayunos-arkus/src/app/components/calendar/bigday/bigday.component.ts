import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

export interface objectDay {
  day: string | Date,
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
  dayText: string

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventsday.day = new Date(this.eventsday.day)
    this.dayText = this.eventsday.day.toLocaleDateString('es-MX', {day: '2-digit', month: 'long'})
  }

  ngOnInit(): void {
    // this.eventsday = testData
    // console.log(this.eventsday)
  }

}
// export const testData: objectDay = {
//   day: "2022-02-01",
//   events: [
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     },
//     {
//       date: "2022-02-01",
//       event: false,
//       first_name: "Angel",
//       last_name: "Quinones",
//       id_user: 2
//     }
//   ]
// }
