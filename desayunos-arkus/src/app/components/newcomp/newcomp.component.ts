import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newcomp',
  templateUrl: './newcomp.component.html',
  styleUrls: ['./newcomp.component.scss']
})
export class NewcompComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const calendar = document.querySelector("#app-calendar");
    for(let day = 1; day <= 31; day++){
      calendar?.insertAdjacentHTML("beforeend",`<div class="day">${day}</div>`);
    }
  }

}
