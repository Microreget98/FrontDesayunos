import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  fnameandlas: boolean = true;
  valueU= "Andres";
  constructor() {}

  ngOnInit(): void {
  }

  showname(){
    alert(this.valueU)
  }

  buttonD() {
    if (this.fnameandlas === true) {
      this.fnameandlas = false
    } else {
      this.fnameandlas = true
    }
  }
}