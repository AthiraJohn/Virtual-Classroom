import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserModel } from '../signup/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:String ="Login";
  user = new UserModel( null, null, null);
  roles: string[] = ['admin','student','teacher'];
  radio:String="";
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  // loginUser(){
  //   localStorage.setItem("UserEmail", this.user.email);
  //   this._auth.loginUser(this.user)
  //   .subscribe(res=>{
  //     localStorage.setItem('token', res.token);
  //     sessionStorage.setItem("user", this.user.email);
  //     this._router.navigate([''])
  //   });
  // }
  login(){
    if(this.radio=="admin"){
      //
    }
    else if(this.radio=="teacher"){
      console.log(this.radio);
      this._auth.teacherLogin(this.user).subscribe(
        res=>{
          localStorage.setItem('tId',res.id);
          localStorage.setItem('token',res.token);
          localStorage.setItem('name',res.username);
          this._router.navigate(['teacherHome']);
        },
        err=>{
          alert(err.error);
          window.location.reload();
        }
      )
    }
    else{
      console.log(this.radio);
    this._auth.studentLogin(this.user).subscribe(
      res=>{
        localStorage.setItem('sId',res.id);
        localStorage.setItem('token',res.token);
        localStorage.setItem('name',res.username);
        this._router.navigate(['studentHome']);
      },
      err=>{
        alert(err.error);
        window.location.reload();
      }
    )
    }
  }
}
