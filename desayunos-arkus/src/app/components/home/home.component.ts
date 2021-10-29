import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public events: any[];
  public options: any;
  constructor() { }

  ngOnInit(): void {

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header:{
        left: 'prev, next',
        center: 'title',
        right: 'dayGridMonth, timeGridweek, timeGridDay'
      },
      editable: false
    }

    this.events = [
      {
        title: "Evento1",
        start: new Date(),
        description: "Evento1"
      },
      {
        title: "Evento2",
        start: new Date( new Date().getTime() + 86400000 ),
        description: "Evento2"
      },
      {
        title: "Evento3",
        start: new Date( new Date().getTime() + (86400000 * 2) ),
        end: new Date( new Date().getTime() + (86400000 * 3) ),
        description: "Evento3"
      }
    ]
  }

}
