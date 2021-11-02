import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';



//INICIO Servicios
import { ReactiveFormsModule } from '@angular/forms';
//FIN Servicios


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { ApiService } from './core/api.service';
import { HomeComponent } from './components/home/home.component';
import { FullCalendarModule } from 'primeng/fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    PerfilComponent,
    LoginRegistroComponent,
    HomeComponent,
    FullCalendarModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    FullCalendarModule
    
  
  ],
  exports:[],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
