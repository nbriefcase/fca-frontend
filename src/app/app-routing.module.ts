import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';

const routes: Routes = [
  { component: HomeComponent, path: '', canActivate: [AuthGuard] },
  { component: RegisterComponent, path: 'register' },
  { component: LoginComponent, path: 'login' },
  { component: UserlistingComponent, path: 'user', canActivate: [AuthGuard] },
  { component: CustomerComponent, path: 'customer', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
