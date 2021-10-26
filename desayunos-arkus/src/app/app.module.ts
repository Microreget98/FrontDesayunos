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



//INICIO Servicios
import { ReactiveFormsModule } from '@angular/forms';
//FIN Servicios


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewcompComponent } from './components/newcomp/newcomp.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NewcompComponent,
    CalendarioComponent,
    PerfilComponent,
    
  
    
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
    FormsModule
  ],
  exports:[
  
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
