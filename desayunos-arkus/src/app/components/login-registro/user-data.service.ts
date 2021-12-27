import { Injectable } from '@angular/core';
import { UserData } from './models/UserData';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: UserData[] = []
  private cookie_name = '';
  private cookie_value = '';
  private all_cookies: any = '';
  userDataString: string

  userType: Boolean;

  bypass(){
    let userData: UserData[] = [{
      dob: new Date(),
      email: "generic@arkusnexus.com",
      first_name: "Generic",
      last_name: "GenericLastName",
      id_user: 1,
      id_user_type: 1,
      is_active: true,
      location: "mty",
      pass: "88450"
    }]
    this.cookieService.set('name', JSON.stringify(userData[0]))
  }

  addUserInfo(data) {
    this.userData.push(data)
  }
  constructor(private cookieService: CookieService, private router: Router) {

  }

  getUserType(): boolean {
    let userData = JSON.parse(this.userDataString)
    return userData.id_user_type === 1;
  }

  getUserId(): number {
    let userData = JSON.parse(this.userDataString)
    return userData.id_user;
  }


  setCookie() {
    this.cookieService.set('name', JSON.stringify(this.userData[0]))
  }
  deleteCookie() {
    this.cookieService.delete('name')
  }
  deleteAll() {
    this.cookieService.deleteAll();
  }

  ngOnInit(): void {
    try {
      this.bypass();
      this.cookie_name = this.cookieService.get('name');
      this.userDataString = this.cookie_name
      this.all_cookies = this.cookieService.getAll();
    } catch {
      this.router.navigate(['login'])
    }

  }
}
