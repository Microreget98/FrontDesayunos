import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
 
    createFormGroup(){
    return new FormGroup({
        lastname: new FormControl('',[Validators.required, Validators.minLength(5)]),
        firstname: new FormControl('',[Validators.required, Validators.minLength(5)]),

    })
}
  
  
  constructor() 
  {
    
  
   }

  ngOnInit(): void {
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