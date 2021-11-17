import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  
}
const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-vista-de-usuario',
  templateUrl: './vista-de-usuario.component.html', 
  styleUrls: ['./vista-de-usuario.component.scss']
})
export class VistaDeUsuarioComponent implements OnInit {
 
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
  
    constructor(private _liveAnnouncer: LiveAnnouncer) {}
  
    @ViewChild(MatSort)
    sort: MatSort = new MatSort;
  
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
  ngOnInit(): void {
  }

}
