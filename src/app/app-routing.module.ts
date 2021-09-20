import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminTeachersComponent } from './admin-teachers/admin-teachers.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthGuard } from './auth.guard';
import { CreateClassComponent } from './create-class/create-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { EnrollClassComponent } from './enroll-class/enroll-class.component';
import { GoToClassComponent } from './go-to-class/go-to-class.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { SignupComponent } from './signup/signup.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path:'teacherHome',canActivate:[AuthGuard],component:TeacherHomeComponent},
  {path:'studentHome',canActivate:[AuthGuard],component:StudentHomeComponent},
  {path:'createclass',canActivate:[AuthGuard],component:CreateClassComponent},
  {path:'enrollclass',canActivate:[AuthGuard],component:EnrollClassComponent},
  {path:'editClass',canActivate:[AuthGuard],component:EditClassComponent},
  {path:'gotoclass',canActivate:[AuthGuard],component:GoToClassComponent},
  {path:'notes',canActivate:[AuthGuard],component:NotesComponent},
  {path:'assignments',canActivate:[AuthGuard],component:AssignmentsComponent},
  {path:'submissions',canActivate:[AuthGuard],component:SubmissionsComponent},
  {path:'admin-home',canActivate:[AuthGuard],component:AdminHomeComponent},
  {path:'admin-students',canActivate:[AuthGuard],component:AdminStudentsComponent},
  {path:'admin-teachers',canActivate:[AuthGuard],component:AdminTeachersComponent},
  {path:'adduser/:type',canActivate:[AuthGuard],component:AdminAddUserComponent}
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
