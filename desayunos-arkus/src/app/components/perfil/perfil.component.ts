import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  disabled:boolean =true;
  fnameandlas: boolean = true;
  perfilForm = new FormGroup({
    firstName: new FormControl('' ),
    lastname: new FormControl(''),
   })
    ValiMessa: FormGroup;
    //ValiMessa2: FormGroup;
   
   
    constructor(private fb: FormBuilder) 
    { 
      this.ValiMessa = this.fb.group({
        firstName: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],
        lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]]
      });
      
      
     }

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn(this.ValiMessa.value);
   // console.warn(this.ValiMessa2.value);
  }

  get firstName(){ return this.ValiMessa.get('firstName');}
  get lastName(){ return this.ValiMessa.get('lastname');}

  updateProfile() {
    
console.log('perfilForm');
    
  }

  buttonD() {
    if (this.fnameandlas === true) {
      this.fnameandlas = false
    } else {
      this.fnameandlas = true
    }
  }
}