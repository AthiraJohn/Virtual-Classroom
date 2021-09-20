import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserModel } from '../signup/user.model';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {
  type: String;
  user = new UserModel(null,null,null);

  constructor(private activatedRoute:ActivatedRoute,private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.type = params.get('type');
    })
  }
  add(){
    if(this.type == "Student"){
      this.auth.studentSignup(this.user).subscribe(
        res=>{
          alert("Student Added");
          this.router.navigate(['admin-students']);
        },
        err=>{
          console.log(err.error);
          alert(err.error);
        }
      )
    }
    else{
      this.auth.teacherSignup(this.user).subscribe(
        res=>{
          alert('Teacher Added');
          this.router.navigate(['admin-teachers']);
        },
        err=>{
          alert(err.error);
          console.log(err);
        }
      )
    }
  }
}
