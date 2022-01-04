import { Breakfast } from './Breakfast';
import { UserData } from './UserData';

export interface Day {
  date: Date;
  breakfasts: Array<Breakfast>;
  userData: UserData;
  festiveType: number;
}
