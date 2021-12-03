import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api.service';
import { CalendarUsers } from '../models/CalendarUsers';
import { DialogData } from '../models/DialogData';
import { Dishes } from '../models/Dishes';
import { ConfigService } from '../../../core/config.service';
import { faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserDataService } from '../../login-registro/user-data.service';



@Component({
  selector: 'dialog-menu',
  templateUrl: 'dialog-menu.component.html',
  styleUrls: ['./dialog-menu.component.scss']
})
export class DialogMenu implements OnInit {
  faTimes = faTimes
  faUser = faUserCircle
  inputDate: Date = new Date(parseInt(this.data.dateStr.split('-')[0]), parseInt(this.data.dateStr.split('-')[1]) - 1, parseInt(this.data.dateStr.split('-')[2]))
  ActDi: Date = new Date();

  panelOpenState = false;

  UserListPerDay: CalendarUsers[] = [];
  dishesList: Dishes[] = [];

  selectedDishId: number;

  isAdmin = this.userData.getUserType();

  isUser = this.userData.getUserId();
  
  toastr: any;

  btnEneabled=false;

  constructor(
    public dialogRef: MatDialogRef<DialogMenu>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService,
    private configService: ConfigService,
    private userData: UserDataService) { }


  ngOnInit(): void {
    this.loadData();
  }

  UserValidationDay(userslist:CalendarUsers[] ){
    let emptyuserlist:CalendarUsers[] = [];
    emptyuserlist = userslist.filter(x => x.id_user === this.isUser)
    this.btnEneabled = emptyuserlist.length > 0 ? true : false;
  }


  loadData() {
    this.apiService.GetData(`${this.configService.config.apiUrl}/api/Calendar/${this.data.dateStr}`)
      .subscribe(
        {
          next: (res: CalendarUsers[]) => {
            this.UserListPerDay = res;
            this.UserValidationDay(this.UserListPerDay);
          }
          
        }
      );

  }

  getSelectedDish(selectedOptions) {
    this.selectedDishId = selectedOptions;
  }


  handleSaveButton() {

    const dataToPost = {
      id_user: this.data.userId,
      date: new Date(this.data.dateStr),
      is_active: true,
      was_deleted: false
    }

    this.apiService.PostData(`${this.configService.config.apiUrl}/api/Calendar`, dataToPost).pipe(
      catchError((error): any =>
        //Mensaje una vez Registrado para el desayuno exitosamente 
        Swal.fire({
          icon: 'error',
          title: 'Un error a ocurrido',
          text: 'Inténtelo nuevamente'
        })),
      map((res) => {
        this.loadData();
      })
    ).subscribe(
      (res) => {

        //Mensaje una vez Registrado para el desayuno exitosamente 
        if (res !==null) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado exitosamente',
            text: 'Gracias'
          })
        }
      }
    );
  }


  handleDeleteUser(id_user) {

    Swal.fire({
      title: '¿Deseas eliminar este registro?',
      text: "Se cancelará su asistencia a este día",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Asistencia eliminada'
        })
        const deleteParams = {
          id_user: id_user,
          date: this.data.dateStr
        }

        this.apiService.PostData(`${this.configService.config.apiUrl}/api/Calendar/DeleteUser`, {}, { params: deleteParams }).pipe(
          map((res) => {
            this.loadData();
          })
        ).subscribe();
      }
    })



  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}