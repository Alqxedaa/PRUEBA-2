import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'notfound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,PagesModule]
})
export class AppRoutingModule { }
