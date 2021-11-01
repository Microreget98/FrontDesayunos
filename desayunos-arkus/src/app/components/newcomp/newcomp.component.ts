import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
//import { profile } from 'console';

@Component({
  selector: 'app-newcomp',
  templateUrl: './newcomp.component.html',
  styleUrls: ['./newcomp.component.scss']
})
export class NewcompComponent implements OnInit {
  //solo es para agregar valores en los inputs
 perfilForm = new FormGroup({
  firstName: new FormControl(''),
  lastname: new FormControl(''),
 })
  ValiMessa: FormGroup;
  ValiMessa2: FormGroup;
 
 
 
 
 

  constructor(private fb: FormBuilder) 
  { 
    this.ValiMessa = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],

    });
    this.ValiMessa2 = this.fb.group({
    lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]]
  });
   }
   
  ngOnInit(): void {

  
  }
  onSubmit(){
    console.warn(this.ValiMessa.value);
    console.warn(this.ValiMessa2.value);
  }

  get firstName(){ return this.ValiMessa.get('firstName');}
  get lastName(){ return this.ValiMessa.get('lastname');}

  updateProfile() {
    
console.log('perfilForm');
    
  }


}

