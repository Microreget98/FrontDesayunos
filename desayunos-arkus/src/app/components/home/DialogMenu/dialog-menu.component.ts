import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api.service';
import { CalendarUsers } from '../models/CalendarUsers';
import { DialogData } from '../models/DialogData';
import { Dishes } from '../models/Dishes';
import { ConfigService } from '../../../core/config.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ContentObserver } from '@angular/cdk/observers';
import Swal from 'sweetalert2';


@Component({
  selector: 'dialog-menu',
  templateUrl: 'dialog-menu.component.html',
  styleUrls: ['./dialog-menu.component.scss']
})
export class DialogMenu implements OnInit {
  faTimes = faTimes
  inputDate: Date = new Date(parseInt(this.data.dateStr.split('-')[0]), parseInt(this.data.dateStr.split('-')[1]) - 1, parseInt(this.data.dateStr.split('-')[2]))
  ActDi: Date = new Date();

  panelOpenState = false;

  UserListPerDay: CalendarUsers[] = [];
  dishesList: Dishes[] = [];

  selectedDishId: number;

  constructor(
    public dialogRef: MatDialogRef<DialogMenu>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService,
    private configService: ConfigService) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.GetData(`${this.configService.config.apiUrl}/api/Calendar/${this.data.dateStr}`)
      .subscribe(
        {
          next: (res: CalendarUsers[]) => {
            this.UserListPerDay = res;
          }
        }
      );
  }

  getSelectedDish(selectedOptions) {
    this.selectedDishId = selectedOptions;
  }


  handleSaveButton() {
    //Mensaje una vez Registrado para el desayuno exitosamente 
    Swal.fire({
      icon: 'success',
      title: 'Registrado exitosamente',
      text: 'Gracias'
    })
    const dataToPost = {
      id_user: this.data.userId,
      date: new Date(this.data.dateStr),
      is_active: true,
      was_deleted: false
    }
    this.apiService.PostData(`${this.configService.config.apiUrl}/api/Calendar`, dataToPost).pipe(
      map((res) => {
        this.loadData();
      })
    ).subscribe(
      (error) => {
      }
    );
    // this.apiService.PutData(`${this.configService.config.apiUrl}/api/Calendar`, dataToPost).pipe(
    //   map((res) => {
    //     this.loadData();
    //   })
    // ).subscribe();
  }

  handleDeleteUser(id_user) {
    Swal.fire({
      icon: 'success',
      title: 'asistencia eliminada'
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}