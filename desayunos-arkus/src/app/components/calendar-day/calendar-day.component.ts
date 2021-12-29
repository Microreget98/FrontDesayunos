import { ApiService } from 'src/app/core/api.service';
import { Breakfast } from '../home/models/Breakfast';
import { catchError } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/config.service';
import { UserData } from '../home/models/UserData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() breakfasts: Array<Breakfast>;
  @Input() userData: UserData;
  @Input() festiveType: number;
  @Input() public handleDayClick: (param: number) => void;

  dayNumber: number;
  myBreakfasts: Array<any>;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.dayNumber = this.date.getDate();
    this.myBreakfasts = this.compressNames(this.breakfasts);

    // Pick the first 4 elements of the array
    this.myBreakfasts = this.myBreakfasts.slice(0, 4);
  }

  isButtonEnabled() {
    const todayLimit = this.getTodayLimit();
    const now = new Date();

    if (this.festiveType !== 0) return true;
    if (now >= todayLimit) return true;
    return false;
  }

  getTodayLimit() {
    // Get the limit time to register on this day
    let date = new Date(this.date.getTime());
    date.setDate(date.getDate() - 1);
    date.setHours(15);
    date.setMinutes(0, 0, 0);
    return date;
  }

  getCssFestClass(festiveType: number) {
    if (festiveType === 1) return 'mexican-festive';
    if (festiveType === 2) return 'american-festive';
    return '';
  }

  compressNames(breakfasts: Array<any>) {
    const newBreakfasts = [];
    for (let i = 0; i < breakfasts.length; i++) {
      const bf = breakfasts[i];
      const smallName =
        bf.firstName.split(' ')[0] + ' ' + bf.lastName.split(' ')[0];
      newBreakfasts.push({ ...bf, name: smallName });
    }

    return newBreakfasts;
  }

  handleSaveButton() {
    const postData = {
      id_user: this.userData.id,
      date: new Date().toISOString().slice(0, -5),
      is_active: true,
      was_deleted: false,
    };

    this.apiService
      .PostData(`${this.configService.config.apiUrl}/api/Calendar`, postData)
      .pipe(
        catchError((error): any => {
          Swal.fire({
            icon: 'error',
            title: 'Un error a ocurrido',
            text: 'Inténtelo nuevamente',
          });
        })
      )
      .subscribe((res) => {
        if (res !== null) {
          Swal.fire({
            timer: 2000,
            icon: 'success',
            text: 'Desayuno registrado 🍳👌',
          });
        }
      });
  }
}
