import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotopComponent } from './fotop.component';

describe('FotopComponent', () => {
  let component: FotopComponent;
  let fixture: ComponentFixture<FotopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
