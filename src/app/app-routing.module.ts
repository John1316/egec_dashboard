import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  { path:'' , redirectTo:'admin/home' , pathMatch: 'full' },
  { path: 'admin/home' , canActivate:[ AuthenticationGuard]  ,loadChildren: () => import('./pages/content/home/home.module').then(m => m.HomeModule) },
  { path: 'admin/login',  loadChildren: () => import('./pages/content/auth/login/login.module').then(m => m.LoginModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
