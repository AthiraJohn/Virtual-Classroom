import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateClassComponent } from './create-class/create-class.component';
import { EnrollClassComponent } from './enroll-class/enroll-class.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path:'teacherHome',canActivate:[AuthGuard],component:TeacherHomeComponent},
  {path:'studentHome',canActivate:[AuthGuard],component:StudentHomeComponent},
  {path:'createclass',canActivate:[AuthGuard],component:CreateClassComponent},
  {path:'enrollclass',canActivate:[AuthGuard],component:EnrollClassComponent}
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
