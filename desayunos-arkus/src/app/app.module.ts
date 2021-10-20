import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewcompComponent } from './components/newcomp/newcomp.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NewcompComponent,
    LoginRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
