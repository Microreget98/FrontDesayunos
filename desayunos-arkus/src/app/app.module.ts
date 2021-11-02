import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';



//INICIO Servicios
import { ReactiveFormsModule } from '@angular/forms';
//FIN Servicios


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { ApiService } from './core/api.service';
import { HomeComponent } from './components/home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { DialogMenu } from './components/home/DialogMenu/dialog-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfigService } from './core/config.service';


const appInitializerFn = (config: ConfigService) => {
  return () => {
    return config.loadAppConfig();
  };
};

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    LoginRegistroComponent,
    HomeComponent,
    DialogMenu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    },
    ApiService,
    ConfigService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogMenu]
})
export class AppModule { }
