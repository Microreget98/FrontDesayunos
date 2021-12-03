import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, ReplaySubject} from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from '../../core/config.service';

export interface UsersList {
  image: string;
  name: string;
  lastName: string;
}

const USERS_DATA: UsersList[] = [
  {image:'photo', name:'Ivan', lastName:'Garcia'},
  {image:'photo', name:'Angel', lastName:'Quinones'},
  {image:'photo', name:'Lesly', lastName:'Hernandez'},
  {image:'photo', name:'Lily', lastName:'Medina'},
  {image:'photo', name:'Andres', lastName:'Morales'},
  {image:'photo', name:'Alexis', lastName:'Mata'},
  {image:'photo', name:'Francisco', lastName:'Albear'},
  {image:'photo', name:'Mauricio', lastName:'Urbina'},
  {image:'photo', name:'Miguel', lastName:'Florentino'},
  {image:'photo', name:'Roberto', lastName:'Aguirre'},
  {image:'photo', name:'Isaac', lastName:'De la Rosa'},
  {image:'photo', name:'Luis', lastName:'Fortozo'},
  {image:'photo', name:'Dante', lastName:'Barboza'},
  {image:'photo', name:'Gohan', lastName:'Ruiz'},
  {image:'photo', name:'Jonathan', lastName:'Blanco'},
  {image:'photo', name:'Leopoldo', lastName:'Flanagan'},
  {image:'photo', name:'Pablo', lastName:'Lopez'},
  {image:'photo', name:'Steve', lastName:'Rodriguez'}
]

@Component({
  selector: 'app-vista-de-usuario',
  templateUrl: './vista-de-usuario.component2.html',
  styleUrls: ['./vista-de-usuario.component2.scss']
})
export class VistaDeUsuarioComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ){
    
  }

  // loadData() {
  //   this.apiService.GetData(`${this.configService.config.apiUrl}/api/Calendar/${this.data.dateStr}`)
  //     .subscribe(
  //       {
  //         next: (res: CalendarUsers[]) => {
  //           this.UserListPerDay = res;
  //         }
  //       }
  //     );
  // }

  displayedColumns: string [] = ['select', 'image', 'name', 'lastName', 'userType'];
  dataToDisplay:Array<any> = [...USERS_DATA];
  dataSource = new MatTableDataSource<UsersList>(this.dataToDisplay);
  selection = new SelectionModel<UsersList>(true, []);

  /* Valida si el numero de elementos seleccionados coincide con el numero total de filas */
  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /* Selecciona todas las filas si no lo estan; sino limpia la seleccion */
  masterToggle(){
    if(this.isAllSelected()){
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /*  */
  checkboxLabel(row?: UsersList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
  /* Filtro de busqueda */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeData() { 
    const element = this.selection.selected;
  }

  ngOnInit(): void {
  }
}
class UsersDataSource extends DataSource<UsersList> {
  private _dataStream = new ReplaySubject<UsersList[]>();

  constructor(initialData: UsersList[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<UsersList[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: UsersList[]){
    this._dataStream.next(data);
  }
}