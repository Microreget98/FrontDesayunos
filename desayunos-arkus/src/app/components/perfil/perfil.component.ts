import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  editname:boolean = true;
  editdob:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  enablebutton(){
    if (this.editname === true){
      this.editname = false
    }else{
      this.editname = true
    }
    
    // console.log("hola")
  }
  enablebutton1(){
    if (this.editdob === true){
      this.editdob = false
    }else{
      this.editdob = true
    }
    
    // console.log("hola")
  }

}
