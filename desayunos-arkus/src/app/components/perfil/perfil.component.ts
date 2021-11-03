import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  fnameandlas: boolean = true;
  showFiller = false;
  fname: string = "Angel";
  lname: string = "Quiñones";
  
  perfilForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sedes: new FormControl('')
    //datehapp: new FormControl('')
  })
//Valida Todo Los inputs
  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sedes:['',Validators.required]
      //datehapp:['',[Validators.required]]
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
    if (this.fnameandlas === true) {
      this.fnameandlas = false
    } else {
      this.fnameandlas = true
    }
  }

  userData:object = {
    "id_user": 1,
    "firstname": this.fname,

  } 

}