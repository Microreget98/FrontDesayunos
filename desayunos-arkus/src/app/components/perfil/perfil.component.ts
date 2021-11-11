import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  fnameandlas: boolean = true;

  perfilForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sedes: new FormControl(''),
  })

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      firstName: [{value:null, disabled: true}, [Validators.required]],
      lastName: ['', [Validators.required]],
      sedes: ['']
    });


  }

  ngOnInit(): void {
  }

  updateProfile() {

    console.log('perfilForm');

  }

  onSubmit() {
    console.warn(this.perfilForm.value);
  }



  buttonD() {
    // this.perfilForm.get('firstName').enable();
    let controls = this.perfilForm.controls
    for (const iterator of Object.keys(controls)) {
      if (this.perfilForm.get(`${iterator}`).disabled) {
        this.perfilForm.get(`${iterator}`).enable();
      } else {
        this.perfilForm.get(`${iterator}`).disable();
      }
    }
    
  }
}