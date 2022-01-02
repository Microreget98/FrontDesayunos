import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ApiService } from './core/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BigDayComponent } from './components/big-day/big-day.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { ConfigService } from './core/config.service';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogMenu } from './components/home/DialogMenu/dialog-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FotopComponent } from './components/fotop/fotop.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VistaDeUsuarioComponent } from './components/vista-de-usuario/vista-de-usuario.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const appInitializerFn = (config: ConfigService) => {
  return () => {
    return config.loadAppConfig();
  };
};

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    BigDayComponent,
    CalendarComponent,
    CalendarDayComponent,
    ConfirmacionComponent,
    DialogMenu,
    FotopComponent,
    HomeComponent,
    LoginRegistroComponent,
    PerfilComponent,
    VistaDeUsuarioComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    SweetAlert2Module,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService],
    },
    ApiService,
    ConfigService,
    CookieService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogMenu, FotopComponent],
})
export class AppModule {}
