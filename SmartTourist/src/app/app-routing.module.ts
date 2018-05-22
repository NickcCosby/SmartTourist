import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CallbackComponent } from './callback/callback.component';
const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'main', component:MainComponent},
  {path: 'home', component:MainComponent},
  {path: 'callback', component:CallbackComponent},
  {path: '', pathMatch:'full', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
