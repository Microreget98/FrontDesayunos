import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from '../../core/config.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../components/login-registro/user-data.service';

export interface UsersList {
  id_user: number;
  image: string;
  first_name: string;
  last_name: string;
  id_user_type: number;
}
// const USERS_DATA: UsersList[] = []

@Component({
  selector: 'app-vista-de-usuario',
  templateUrl: './vista-de-usuario.component.html',
  styleUrls: ['./vista-de-usuario.component.scss']
})
export class VistaDeUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['select', 'image', 'first_name', 'last_name', 'id_user_type'];
  dataToDisplay = [];
  dataSource = new MatTableDataSource<UsersList>();
  selection = new SelectionModel<UsersList>(true, []);
  userstype = [
    {value: 1, display: 'Admin'},
    {value: 2, display: 'Colaborador'}
  ];

  @ViewChild(MatTable) tableUsersList: MatTable<UsersList>


  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
    // console.log(this.dataSource);

  }

  loadData() {
    this.apiService.GetData(`${this.configService.config.apiUrl}/api/users`).subscribe(
      (response: Array<any>) => {
        response.forEach((x:UsersList) => {
          this.dataToDisplay.push({
            id_user: x.id_user,
            image: 'assets/img/icons8-user-64.png',
            first_name: x.first_name,
            last_name: x.last_name,
            id_user_type: x.id_user_type
          })
          this.tableUsersList.renderRows();
        })
      }
    );
    // console.log(this.dataToDisplay);
    // this.tableUsersList.renderRows();
  }

  /* Valida si el numero de elementos seleccionados coincide con el numero total de filas */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /* Selecciona todas las filas si no lo estan; sino limpia la seleccion */
  masterToggle() {
    if (this.isAllSelected()) {
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

  homeReturn(){
    this.dataToDisplay = []
    this.router.navigate(['/home']);
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

  disconnect() { }

  setData(data: UsersList[]) {
    this._dataStream.next(data);
  }
}