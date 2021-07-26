import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { classModel } from '../create-class/class.model';

@Component({
  selector: 'app-enroll-class',
  templateUrl: './enroll-class.component.html',
  styleUrls: ['./enroll-class.component.css']
})
export class EnrollClassComponent implements OnInit {
  classes:classModel[]=[];
  constructor(private cs:ClassesService,private router:Router) { }

  ngOnInit(): void {
    this.cs.getClasses().subscribe((data)=>{
      this.classes = JSON.parse(JSON.stringify(data))
    })
  }

  enroll(classCode:any){
    this.cs.enrollClass(classCode,localStorage.getItem('sId')).subscribe(
      res=>{
        alert('Student Enrolled in Class');
        this.router.navigate(['studentHome']);
      },
      err=>{
        alert(err.error);
        console.log(err);
      }
    )
  }

}
