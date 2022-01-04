import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from 'src/app/core/config.service';
import Swal from 'sweetalert2';
import { Breakfast } from '../home/models/Breakfast';
import { UserData } from '../home/models/UserData';
import { UserDataService } from '../login-registro/user-data.service';

@Component({
  selector: 'app-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.scss'],
})
export class DailyListComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Input() breakfasts: Array<Breakfast> = [];
  @Input() userPersonalData: UserData = {
    id: 0,
    firstName: '',
    lastName: '',
  };
  @Output() deleted = new EventEmitter<boolean>();

  todayLimitDate: Date;
  now: Date = new Date();

  dateStr: string = '';
  bfCount: number = 0;

  isAdmin: boolean = false; // this.userData.getUserType();
  isUser: number = 0; // this.userData.getUserId();

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private userData: UserDataService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.userData.getUserType();
    this.isUser = this.userData.getUserId();
    this.bfCount = this.breakfasts.length;

    this.dateStr = this.date.toISOString().slice(0, 10) + ' 00:00:00.000';

    this.todayLimitDate = new Date(this.date.getTime());
    this.todayLimitDate.setDate(this.todayLimitDate.getDate() - 1);
    this.todayLimitDate.setHours(15, 0, 0, 0);
    console.log(this.todayLimitDate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  handleDeleteUser(userId: number) {
    Swal.fire({
      title: '¿Deseas eliminar el registro de este día?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Registro eliminado',
        });
        const deleteParams = {
          id_user: userId,
          date: this.dateStr,
        };

        this.apiService
          .PostData(
            `${this.configService.config.apiUrl}/api/Calendar/DeleteUser`,
            {},
            { params: deleteParams }
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
            this.deleted.emit(true);
            console.log('ya se eliminó');
          });
      }
    });
  }
}
