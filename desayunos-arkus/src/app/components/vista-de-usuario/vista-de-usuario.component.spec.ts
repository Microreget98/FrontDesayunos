import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDeUsuarioComponent } from './vista-de-usuario.component';

describe('VistaDeUsuarioComponent', () => {
  let component: VistaDeUsuarioComponent;
  let fixture: ComponentFixture<VistaDeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaDeUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
