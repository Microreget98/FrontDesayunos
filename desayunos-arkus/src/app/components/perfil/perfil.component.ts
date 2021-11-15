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

  perfilForm = new FormGroup({})

  firstchar: string = "";

  //Valida Todo Los inputs
  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      firstName: [{value:null, disabled: true}, [Validators.required]],
      lastName: ['', [Validators.required]],
      sedes: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      datePo: ['', [Validators.required]]

    });

    // this.firstchar = this.fname.charAt(0);

  }

  ngOnInit(): void {
    this.firstchar = String(this.perfilForm.get("firstName").value).charAt(0);
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      this.perfilForm.get(`${iterator}`).disable();
    }
    console.log(this.perfilForm.controls)
  }

  updateProfile() {

    console.log('perfilForm');

  }

  onSubmit() {
    let PerfilData = {
      
    }
    console.log(this.perfilForm.value);
  }

  buttonD() {
    
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      if (this.perfilForm.get(`${iterator}`).disabled) {
        this.perfilForm.get(`${iterator}`).enable();
      } else {
        this.perfilForm.get(`${iterator}`).disable();
      }
    }
  }

<<<<<<< HEAD
  userData: object = {
    "id_user": 1,
    "firstname": this.fname,
    "lastname": this.lname,
    "passwerd": this.passw,
    "date": this.dateP,
    "sedes": this.sedes
  }

}
// Hay que modificar la forma en la que se envian los datos, para enviarlos a la base de datos
=======
}
>>>>>>> 7329c4c7135e0ffbe7a4371226ea506a060f0e8b
