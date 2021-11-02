import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
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
