import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { VistaDeUsuarioComponent } from './components/vista-de-usuario/vista-de-usuario.component';
import { CalendarComponent } from './components/calendar/calendar.component';
// import { Calendar } from '@fullcalendar/core';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginRegistroComponent},
  { path: 'home', component: HomeComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: 'vistausuarios', component: VistaDeUsuarioComponent },
  { path: 'nuevocal', component: CalendarComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
