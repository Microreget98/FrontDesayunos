import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Breakfast } from '../home/models/Breakfast';
import { UserData } from '../home/models/UserData';

@Component({
  selector: 'app-selected-day',
  templateUrl: './selected-day.component.html',
  styleUrls: ['./selected-day.component.scss'],
})
export class SelectedDayComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() breakfasts: Array<Breakfast> = [];
  @Input() userData: UserData = {
    id: 0,
    firstName: '',
    lastName: '',
  };
  @Output() deleted = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete() {
    this.deleted.emit(true);
  }
}
