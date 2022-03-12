import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjuntosComponent } from './Components/adjuntos/adjuntos.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NewUserComponent } from './Components/newUser/newUser.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReportDetailComponent } from './Components/reportDetail/reportDetail.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { UserReportsComponent } from './Components/userReports/userReports.component';
import { UsersComponent } from './Components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "reports",
    component: ReportsComponent
  },
  {
    path: "reportDetail/:id",
    component: ReportDetailComponent,
  }, {
    path: 'addUser',
    component: NewUserComponent
  },
  {
    path: 'userReports/:id',
    component: UserReportsComponent
  },
  {
    path: 'attached',
    component: AdjuntosComponent
  },


  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
