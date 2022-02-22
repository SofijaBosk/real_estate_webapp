import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OnlyAdminUsersGuard, OnlyAgentUsersGuard, OnlyRegularUsersGuard, OnlyUsersLGuard } from './app.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { PasswordComponent } from './password/password.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'user', component:UserComponent,
        canActivate:[OnlyRegularUsersGuard]},
  {path:'worker',component:WorkerComponent,
        canActivate:[OnlyAgentUsersGuard]},
  {path:'admin',component:AdminComponent,
        canActivate:[OnlyAdminUsersGuard]
},
  {path:'guest',component:GuestComponent},
  {path:'register',component:RegisterComponent},
  {path:'password',component:PasswordComponent,
        canActivate:[OnlyUsersLGuard]
      },
  {path:'nekretnine',component:NekretnineComponent,
        canActivate:[OnlyUsersLGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



