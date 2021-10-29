import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public events: any[];
  public options: any[];
  constructor() { }

  ngOnInit(): void {
    this.events = [
      {
        title: "Evento1",
        start: new Date(),
        description: "Evento1"
      }
    ]
  }

}
