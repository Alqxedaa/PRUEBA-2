import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EscanearQrComponent } from './escanear-qr/escanear-qr.component';
import { GenerarQrComponent } from './generar-qr/generar-qr.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SeccionAlumnoComponent } from './seccion-alumno/seccion-alumno.component';
import { SeccionDocenteComponent } from './seccion-docente/seccion-docente.component';
import { QrComponent } from './qr/qr.component';
import { LogoutComponent } from './logout/logout.component';
import { authGuard } from '../guard/auth.guard';
import { redirectIfAuthGuard } from '../guard/redirect-if-auth.guard';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', component:LoginComponent, canActivate: [redirectIfAuthGuard]},
  {path:'escanear-qr', component:EscanearQrComponent},
  {path:'generar-qr', component:GenerarQrComponent},
  {path:'notfound', component:NotfoundComponent},
  {path:'seccion-alumno', component: SeccionAlumnoComponent, canActivate: [authGuard]},
  {path:'seccion-docente', component: SeccionDocenteComponent, canActivate: [authGuard]} ,
  {path:'qr', component: QrComponent},
  {path:'logout', component: LogoutComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class PagesRoutingModule { }
