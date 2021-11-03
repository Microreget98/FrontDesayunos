import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss']
})
export class LoginRegistroComponent implements OnInit {
  ufname: string = "";
  ulname: string = "";
  udob: Date = null;
  uemailR: string = "";
  ulocation: string = "";
  upassR: string = "";
  upassconf: string = "";

  uemailL: string = "";
  upassL: string = "";

  constructor(private APIservices: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  getLogin(){
    let userData:object = {
      email:this.uemailL,
      pass: this.upassL
    }
    this.APIservices.GetDataWBody('https://localhost:44361/api/login', {...userData}).subscribe(
      (response: object) => {
        if (response){
          console.log(response)
          this.router.navigate(['/home'])
        }
        else{
          console.log("FAVOR DE INTENTAR DE NUEVO")
        }
      }
    )
  }

  onClickRegister(){
    let userData:object
    if (this.upassR == this.upassconf){
      userData = {
        first_name: this.ufname,
        last_name: this.ulname,
        dob: this.udob,
        email: this.uemailR,
        location: this.ulocation,
        pass: this.upassR,
        id_user_type: 1,
        is_active: true
      }
    }
     
    // Object.values(userData).forEach(obj => alert(obj));
    // alert(userData)
    this.APIservices.PostData('http://localhost:57397/api/users', userData).subscribe(
      (response: object)=>{
        console.log(response);
      }
    )
  }

}
