import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { ApiService } from './core/api.service';
import { HomeComponent } from './components/home/home.component';
import { FullCalendarModule } from 'primeng/fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegistroComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
