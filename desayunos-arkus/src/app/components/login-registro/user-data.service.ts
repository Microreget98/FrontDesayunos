import { Injectable } from '@angular/core';
import { UserData } from './models/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: UserData[] = []
  
  userType:Boolean;


  addUserInfo(data){
    this.userData.push(data)
  }

  getUserType():boolean{
return this.userData[0].id_user_type===1;
 }

}
