import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { BackofficeComponent } from './paginas/backoffice/backoffice.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './paginas/login/login.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent},
  // vamos a proteger esta ruta con una guarda
  { path: 'backoffice', component: BackofficeComponent, canActivate: [LoginGuard]}
  
];

export const RUTAS = [
  {
    'ruta': '/',
    'nombre': 'Inicio',
    'icono': ''
  }
  //,
  // {
  //   'ruta': '/backoffice',
  //   'nombre': 'BackOffice',
  //   'icono': ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
