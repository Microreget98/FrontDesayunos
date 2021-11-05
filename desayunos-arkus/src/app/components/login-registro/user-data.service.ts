import { Injectable } from '@angular/core';
import { UserData } from './models/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: UserData[] = []
  
  addUserInfo(data){
    this.userData.push(data)
  }

}
