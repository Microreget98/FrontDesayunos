import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayofmonthComponent } from './dayofmonth.component';

describe('DayofmonthComponent', () => {
  let component: DayofmonthComponent;
  let fixture: ComponentFixture<DayofmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayofmonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayofmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
