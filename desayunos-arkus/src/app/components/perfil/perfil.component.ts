import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  zindex = 1;
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

}
