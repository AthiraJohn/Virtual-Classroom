import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { studentModel } from '../admin-students/studentModel';
import { AuthService } from '../auth.service';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {

  teacher: studentModel
  constructor(private auth:AuthService,private router:Router,private cls:ClassesService) { }

  ngOnInit(): void {
    this.auth.listTeachers().subscribe((data)=>{
      this.teacher = JSON.parse(JSON.stringify(data));
      console.log(this.teacher);
    })
  }

  //delete teacher
  deleteTeacher(id:any){
    const retval = confirm('Are you sure you want to delete this teacher?');
    if(retval){
      this.auth.deleteTeacher(id).subscribe((data)=>{
        alert('Teacher Deleted');
        location.reload();
      })
    }
  }

  //delete class
  deleteClass(id:any){
    const retval = confirm('Are you sure you want to delete this class?');
    if(retval){
      this.cls.deleteClass(id).subscribe((data)=>{
        alert('Class Deleted');
        location.reload();
      })
    }
  }

}
