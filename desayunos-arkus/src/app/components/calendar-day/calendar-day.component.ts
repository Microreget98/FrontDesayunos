import { ApiService } from 'src/app/core/api.service';
import { Breakfast } from '../home/models/Breakfast';
import { catchError } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() breakfasts: Array<Breakfast> = [];
  @Input() userData: UserData;
  @Input() festiveType: number = 0;
  @Input() specialEvent: boolean = false;
  @Output() registered = new EventEmitter<boolean>();
  @Output() clicked = new EventEmitter<any>();

  dayNumber: number;
  myBreakfasts: Array<any>;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    if (this.date.toISOString().slice(0, 10) === '2022-01-06') {
      this.specialEvent = true;
    }

    this.dayNumber = this.date.getDate();
    this.myBreakfasts = this.compressNames(this.breakfasts).reverse();

    // Pick the first 4 elements of the array
    this.myBreakfasts = this.myBreakfasts.slice(0, 4);
  }

  isButtonEnabled() {
    const todayLimit = this.getTodayLimit();
    const now = new Date();
    const isAlreadyRegistered = this.breakfasts.find(
      (bf) => bf.userId === this.userData.id
    );

    if (isAlreadyRegistered) return true;
    //if (this.festiveType !== 0) return true;
    if (now >= todayLimit) return true;
    return false;
  }

  getTodayLimit() {
    // Get the limit time to register on this day
    let date = new Date(this.date.getTime());
    date.setDate(date.getDate() - 1);
    date.setHours(23);
    date.setMinutes(58, 59, 999);
    return date;
  }

  /*getCssFestClass(festiveType: number) {
    if (festiveType === 1) return 'mexican-festive';
    if (festiveType === 2) return 'american-festive';
    return '';
  }*/

  getCssPastDay() {
    if (this.date < new Date()) return 'cardPastDay';
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

  handleClick() {
    this.clicked.emit({
      date: this.date,
    });
  }

  handleSaveButton() {
    const postData = {
      id_user: this.userData.id,
      date:
        new Date(this.date.getTime()).toISOString().slice(0, 10) + 'T00:00:00',
      is_active: true,
      was_deleted: false,
      event: false,
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
          this.registered.emit(true);
          Swal.fire({
            timer: 2000,
            icon: 'success',
            text: 'Desayuno registrado 🍳👌',
          });
        }
      });
  }

  handlePartyMode() {
    const postData = {
      id_user: this.userData.id,
      date:
        new Date(this.date.getTime()).toISOString().slice(0, 10) + 'T00:00:00',
      is_active: true,
      was_deleted: false,
      event: true,
    };

    this.apiService
      .PostData(
        `${this.configService.config.apiUrl}/api/Calendar/party`,
        postData
      )
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
          this.registered.emit(true);
          Swal.fire({
            timer: 2000,
            icon: 'success',
            text: 'Panqueque registrado 🍳👌',
          });
        }
      });
  }
}
