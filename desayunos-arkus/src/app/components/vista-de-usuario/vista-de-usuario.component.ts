import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';


export interface PeriodicElement {
  
}
const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-vista-de-usuario',
  templateUrl: './vista-de-usuario.component.html', 
  styleUrls: ['./vista-de-usuario.component.scss']
})
export class VistaDeUsuarioComponent implements OnInit {
 
  
    constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
  }

}
