import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginRegistroComponent},
  { path: 'home', component: HomeComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
