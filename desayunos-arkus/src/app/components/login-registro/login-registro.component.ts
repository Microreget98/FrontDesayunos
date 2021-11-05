import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ConfigService } from '../../core/config.service';
import { Router } from '@angular/router';
import { UserDataService } from './user-data.service';

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

  userdata: UserDataService

  constructor(private APIservices: ApiService, 
    private router: Router, 
    private configService: ConfigService,
    private userData: UserDataService) { }

  ngOnInit(): void {
    
  }

  getLogin(){
    let userData:object = {
      email:this.uemailL,
      pass: this.upassL
    }
    this.APIservices.GetDataWBody(`${this.configService.config.apiUrl}/api/login`, {...userData}).subscribe(
      (response: object) => {
        if (response){
          this.userData.addUserInfo(response)
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
    this.APIservices.PostData(`${this.configService.config.apiUrl}/api/users`, userData).subscribe(
      (response: object)=>{
        console.log(response);
      }
    )
  }

}
