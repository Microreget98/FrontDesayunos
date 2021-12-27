import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistroComponent } from './login-registro.component';

//component imports
import { ApiService } from '../../core/api.service'
import { ConfigService } from '../../core/config.service';
import { UserDataService } from './user-data.service';

//inherit modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

//material testing modules
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatDatepickerInputHarness, MatCalendarHarness, MatDatepickerToggleHarness } from '@angular/material/datepicker/testing';

describe('LoginRegistroComponent', () => {

  //for fake services
  let apiService: jasmine.SpyObj<ApiService>;
  let configService: jasmine.SpyObj<ConfigService>;
  let userdataService: jasmine.SpyObj<UserDataService>;

  // for module imports
  let component: LoginRegistroComponent;
  let fixture: ComponentFixture<LoginRegistroComponent>;
  let routertest: RouterTestingModule;
  let formstest: FormsModule;
  let matformtest: MatFormFieldModule;
  let matinputtest: MatInputModule;
  let browseranimationtest: BrowserAnimationsModule;
  let matdatepickertest: MatDatepickerModule
  let matdatepickermoduletest: MatNativeDateModule

  //for material modules
  let matloader: HarnessLoader;
  let rootloader: HarnessLoader;
  let matdpharness: MatDatepickerToggleHarness;
  let matdpcalendarharness: MatCalendarHarness

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiServiceSpy', ['GetDataWBody', 'PutData']);
    configService = jasmine.createSpyObj('ConfigService', ['.config.apiUrl']);
    userdataService = jasmine.createSpyObj('UserDataService', ['setCookie']);
    TestBed.configureTestingModule({
      declarations: [LoginRegistroComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: ConfigService, useValue: configService },
        { provide: UserDataService, useValue: userdataService }
      ]
    }).compileComponents();
    routertest = TestBed.inject(RouterTestingModule);
    formstest = TestBed.inject(FormsModule);
    matformtest = TestBed.inject(MatFormFieldModule);
    matinputtest = TestBed.inject(MatInputModule);
    browseranimationtest = TestBed.inject(BrowserAnimationsModule);
    matdatepickertest = TestBed.inject(MatDatepickerModule);
    matdatepickermoduletest = TestBed.inject(MatNativeDateModule);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests of Register, datasets', () => {
    let datasetofnames = [
      {name: "!@#$%^&*()_+=-"},
      {name: "1234567890"},
      {name: ":;/.,"},
      {name: '""'},
      {name: "console.log(select * from users)"},
    ]
    it('"Nombre" field should accept only letters', () => {
      for (const iterator of datasetofnames) {
        component.name.setValue(iterator.name)
        expect(component.name.valid).toBeFalsy()
      }
    });

    it('"Apellido" field should accept only letters', () => {
      for (const iterator of datasetofnames) {
        component.lastName.setValue(iterator.name)
        expect(component.lastName.valid).toBeFalsy()
      }
    });
    
    let datasetofemail = [
      {email: "usuario_qa+"},
      {email: "usuario&_qa*"},
      {email: "nuB_67$H"},
      {email: "usuario@qa;"},
      {email: "usuario)qa("},
      {email: "usuario!qa#"},
      {email: "usuario^qa%"},
      {email: "usuario&qa*"},
      {email: "console.log(select * from users)"},
    ]

    it('"Textemail" should accept only letters, numbers and the following symbols (.-_)', () => {
      for (const iterator of datasetofemail) {
        component.textEmail.setValue(iterator.email)
        expect(component.textEmail.valid).toBeFalsy()
      }
    })

    it('"Date of birth" field should have an upper bound at 70 years and lower bound at 18 years old', () => {
      let fakeDate = new Date().getFullYear();
      component.dob.setValue(new Date(fakeDate - 70, 0, 1))
      expect(component.dob.valid).toBeTruthy()
      component.dob.setValue(new Date(fakeDate - 18, 0, 1))
      expect(component.dob.valid).toBeTruthy()
      component.dob.setValue(new Date(fakeDate - 71, 0, 1))
      expect(component.dob.valid).toBeFalsy()
      component.dob.setValue(new Date(fakeDate - 17, 0, 1))
      expect(component.dob.valid).toBeFalsy()
    })

    it('should registerPassword field have more than 8 chars', () => {
      component.registerPassword.setValue('1234567')
      expect(component.registerPassword.invalid).toBe(true)
      component.registerPassword.setValue('12345678')
      expect(component.registerPassword.invalid).toBe(false)
    })

    it('should registerPassword field less tha 16 chars', () => {
      component.registerPassword.patchValue('1234567812345678')
      expect(component.registerPassword.invalid).toBe(false)
      component.registerPassword.patchValue('12345678123456789')
      expect(component.registerPassword.invalid).toBe(true)
    })

  })

  describe('Tests of Register, UI/UX', () => {
    let fixtureUI: ComponentFixture<MatDatepickerToggleHarness>;
    let componentUI: MatDatepickerToggleHarness;
    beforeEach(() => {
      fixtureUI = TestBed.createComponent(MatDatepickerToggleHarness);
      componentUI = fixtureUI.componentInstance;
      matloader = TestbedHarnessEnvironment.loader(fixtureUI);
      rootloader = TestbedHarnessEnvironment.documentRootLoader(fixtureUI)
      fixture.detectChanges();
    });
    // matdpharness.getCalendar();
    it('proof of test datepicker', async () => {
      matdpharness = await TestbedHarnessEnvironment.harnessForFixture(fixtureUI, MatDatepickerToggleHarness)
      const dpharness = await matloader.getHarness(MatDatepickerToggleHarness);
      
      console.log(dpharness.openCalendar());

    })
  })



  // preguntar a jhona, como encontrar y probar los mensajes de error con mat-error
  // it('should confirmPassword field show "Las contraseñas deben coincidir" if registerPassword field and confirmpassword field are not equal', () => {
  //   component.registerPassword.setValue('12345678');
  //   component.confirmPassword.setValue('123456789');
  //   const materror = matformfieldharness.hasErrors();
  //   expect(materror).toContain("Las contraseñas deben coincidir");
  // })

});
