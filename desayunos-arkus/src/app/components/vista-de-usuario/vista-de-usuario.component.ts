import { Component, OnInit } from '@angular/core';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-vista-de-usuario',
  templateUrl: './vista-de-usuario.component.html',
  styleUrls: ['./vista-de-usuario.component.scss']
})
export class VistaDeUsuarioComponent implements OnInit {
  faSave = faSave
  faTimes = faTimes
  constructor() { }

  ngOnInit(): void {
  }

}
