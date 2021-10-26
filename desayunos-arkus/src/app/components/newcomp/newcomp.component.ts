import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newcomp',
  templateUrl: './newcomp.component.html',
  styleUrls: ['./newcomp.component.scss']
})
export class NewcompComponent implements OnInit {
  fnameandlas:boolean = true;
  colorControl = new FormControl('primary');
  
 
  
  constructor() 
  {
    
  
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

  SaveData(form:any){
    console.log(form)
  }

}
