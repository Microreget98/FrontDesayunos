import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss']
})
export class LoginRegistroComponent implements OnInit {
  ufname: string = "";
  ulname: string = "";
  uday: number;
  umonth:number;
  uyear: number;
  udob: Date = new Date();
  uemail: string = "";
  ulocation: string = "";
  upass: string = "";
  upassconf: string = "";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
    })
  }

  constructor(private APIservices: ApiService) { }

  ngOnInit(): void {
    
  }

  onClickRegister(){
    this.udob.setDate(this.uday);
    this.udob.setMonth(this.umonth);
    this.udob.setFullYear(this.uyear);
    let userData:object = {
      first_name: this.ufname,
      last_name: this.ulname,
      dob: this.udob,
      email: this.uemail,
      location: this.ulocation,
      pass: this.upass,
      id_user_type: 1,
      is_active: true
    } 
    // Object.values(userData).forEach(obj => alert(obj));
    // alert("boton presionado")
    this.APIservices.PostData('https://localhost:44361/api/users', userData,this.httpOptions).subscribe(
      (response: object)=>{
        console.log(response);
      }
    )
  }

}
