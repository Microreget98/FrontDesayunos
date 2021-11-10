import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  hide = true;
  disprop: boolean = true;
  fnameandlas: boolean = true;
  showFiller = false;
  fname: string = "Andres";
  lname: string = "Andres";
  passw: string = "1234";
  dateP: string = "";
  sedes: string = "";

  perfilForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sedes: new FormControl(''),
    passw: new FormControl(''),
    dateP: new FormControl('')
    //datehapp: new FormControl('')
  })

  firtchar: string = "";

  //Valida Todo Los inputs
  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sedes: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      datePo: ['', [Validators.required]]

    });

    this.firtchar = this.fname.charAt(0);

  }

  ngOnInit(): void {
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      this.perfilForm.get(`${iterator}`).disable();
    }
  }

  updateProfile() {

    console.log('perfilForm');

  }

  onSubmit() {
    console.warn(this.perfilForm.value);
  }

  buttonD() {
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      if (this.perfilForm.get(`${iterator}`).disabled) {
        this.perfilForm.get(`${iterator}`).enable();
      } else {
        this.perfilForm.get(`${iterator}`).disable();
      }

    }

    // if (this.fnameandlas === true) {
    //   this.fnameandlas = false
    // } else {
    //   this.fnameandlas = true
    // }
  }

  userData: object = {
    "id_user": 1,
    "firstname": this.fname,
    "lastname": this.lname,
    "passwerd": this.passw,
    "date": this.dateP,
    "sedes": this.sedes
  }

}