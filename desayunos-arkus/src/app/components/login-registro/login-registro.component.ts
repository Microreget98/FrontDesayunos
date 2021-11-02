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
  udob: Date = null;
  uemail: string = "";
  ulocation: string = "";
  upass: string = "";
  upassconf: string = "";

  constructor(private APIservices: ApiService) { }

  ngOnInit(): void {
    
  }

  onClickRegister(){
    let userData:object
    if (this.upass == this.upassconf){
      userData = {
        first_name: this.ufname,
        last_name: this.ulname,
        dob: this.udob,
        email: this.uemail,
        location: this.ulocation,
        pass: this.upass,
        id_user_type: 1,
        is_active: true
      }
    }
     
    // Object.values(userData).forEach(obj => alert(obj));
    // alert(userData)
    this.APIservices.PostData('https://localhost:44361/api/users', userData).subscribe(
      (response: object)=>{
        console.log(response);
      }
    )
  }

}
