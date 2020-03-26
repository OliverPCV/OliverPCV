import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
// @ts-ignore
import {LogoutComponent} from './logout/logout.component';
import {HomeComponent} from './home/home.component';
import {LoggedinComponent} from './loggedin/loggedin.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'loggedin', component: LoggedinComponent},
  {path: 'userinfo', component: UserinfoComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
