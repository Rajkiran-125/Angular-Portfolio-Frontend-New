import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginGuard} from './services/login.guard' 
import { DashboardGuard } from './services/dashboard.guard';
const routes: Routes = [
  {
    path: 'confirm',
    component: ConfirmationComponent,
  },{
    path:'login',
    component:LoginComponent,
    canActivate: [LoginGuard] 
  },{
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [DashboardGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
