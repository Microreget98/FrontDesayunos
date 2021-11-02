import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api.service';
import { CalendarUsers } from '../models/CalendarUsers';
import { DialogData } from '../models/DialogData';
import { Dishes } from '../models/Dishes';
import { ConfigService } from '../../../core/config.service';

@Component({
    selector: 'dialog-menu',
    templateUrl: 'dialog-menu.component.html',
    styleUrls: ['./dialog-menu.component.scss']
  })
  export class DialogMenu implements OnInit{

    panelOpenState = false;

    UserListPerDay: CalendarUsers[] = []; 
    dishesList: Dishes[] = [];

    selectedDishId: number;
  
    constructor(
      public dialogRef: MatDialogRef<DialogMenu>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private apiService: ApiService,
      private configService: ConfigService) {}
  
  
    ngOnInit(): void {
      this.loadData();
    }

    loadData(){
      this.apiService.GetData(`${this.configService.config.apiUrl}/api/Calendar/${this.data.dateStr}`).pipe(
        switchMap((res: CalendarUsers[]) => {
          this.UserListPerDay = res;
          console.log(this.UserListPerDay);
          return this.apiService.GetData(`${this.configService.config.apiUrl}/api/Calendar/GetDishes`);
        }))
      .subscribe(
        {next: (res: Dishes[]) => {
          this.dishesList = res;
          console.log(this.dishesList);
        }}
      );
    }

    getSelectedDish(selectedOptions){
      this.selectedDishId = selectedOptions;
    }

    handleSaveButton(){
      const dataToPost = {
        id_register_day: 0,
        id_user: this.data.userId,
        date: new Date(this.data.dateStr),
        id_dish: parseInt(this.selectedDishId[0].value),
        is_active: true
      }

      this.apiService.PostData(`${this.configService.config.apiUrl}/api/Calendar`,dataToPost).pipe(
        map((res) => {
          this.loadData();
        })
      ).subscribe();
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }