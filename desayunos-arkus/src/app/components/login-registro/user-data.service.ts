import { Injectable } from '@angular/core';
import { UserData } from './models/UserData';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: UserData[] = []
  private cookie_name='';
  private cookie_value='';
  private all_cookies:any='';
  userDataString:string 
  
  userType:Boolean;


  addUserInfo(data){
    this.userData.push(data)
  }
  constructor( private cookieService:CookieService ){

  }

  setCookie(){
    this.cookieService.set('name',JSON.stringify(this.userData[0]))
  }
  deleteCookie(){
    this.cookieService.delete('name')
  }
  deleteAll(){
    this.cookieService.deleteAll();
  }

  ngOnInit():void{
    this.cookie_name = this.cookieService.get('name');
    this.userDataString = this.cookie_name
    this.all_cookies = this.cookieService.getAll();
    console.log(this.cookie_name)
  }
}
