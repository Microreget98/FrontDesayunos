import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigdayComponent } from './bigday.component';

describe('BigdayComponent', () => {
  let component: BigdayComponent;
  let fixture: ComponentFixture<BigdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
