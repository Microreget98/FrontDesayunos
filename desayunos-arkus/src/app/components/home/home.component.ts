import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDataService } from '../login-registro/user-data.service';
import { Router } from '@angular/router';
import { UserData } from './models/UserData';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userInfo: UserData = {
    id: 0,
    firstName: '',
    lastName: '',
  };

  constructor(private userData: UserDataService, private router: Router) {}

  ngOnInit(): void {
    this.userData.ngOnInit();
    if (this.userData.userDataString !== '') {
      let parsedData = JSON.parse(this.userData.userDataString);
      this.userInfo = {
        id: parsedData.id_user,
        firstName: parsedData.first_name,
        lastName: parsedData.last_name,
      };
    } else {
      this.router.navigate(['/login']);
    }
  }
}
