import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
   fnameandlas:boolean = true;
  colorControl = new FormControl('primary');
  




  createFormGroup(){
    return new FormGroup({
        lastname: new FormControl('',[Validators.required, Validators.minLength(5)]),
        firstname: new FormControl('',[Validators.required, Validators.minLength(5)]),

    })
}
contactForm: FormGroup;
  constructor() 
  {
    
  this.contactForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }

  buttonD(){
    if (this.fnameandlas === true){
      this.fnameandlas = false
    }else{
      this.fnameandlas = true
    }
  }

  onResetForm(){
    this.contactForm.reset()
}

onSaveForm(){
    if(this.contactForm.valid){
        this.onResetForm();
        console.log(' Valid');
    }else{
        console.log('not Valid');
    }
}

}