import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = "Signup";
  radio:String="";
  roles: string[] = ['admin','student','teacher'];
  constructor(private auth:AuthService ,private router: Router) { }

  ngOnInit(): void {
  }

  user = new UserModel(null, null, null);
  signUp(){
    if(this.radio == "admin"){
      //to write
    }
    else if(this.radio == "teacher"){
      this.auth.teacherSignup(this.user).subscribe(
        res=>{
          alert('SignUp Successful');
          this.router.navigate(['login']);
        },
        err=>{
          alert(err.error);
          window.location.reload();
        }
      )
    }
    else{
      this.auth.studentSignup(this.user).subscribe(
        res=>{
          alert('SignUp Successful');
          this.router.navigate(['login'])
        },
        err=>{
          alert(err.error);
          window.location.reload();
        }
      )
    }
  }
  
}
