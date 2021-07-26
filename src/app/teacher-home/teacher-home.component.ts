import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { classModel } from '../create-class/class.model';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  classes: classModel[]=[];
  constructor(private cs:ClassesService,private router:Router) { }

  ngOnInit(): void {
    this.cs.getClassTeacher(localStorage.getItem('tId')).subscribe((data)=>{
      this.classes = JSON.parse(JSON.stringify(data))
      console.log(this.classes);
    })
  }
  edit(code:any){
    localStorage.setItem('editid',code);
    this.router.navigate(['editClass']);
  }
  deleteClass(id:any){
    var retVal = confirm("Do you want to delete this class?");
    if(retVal){
      this.cs.deleteClass(id).subscribe((data)=>{
        location.reload();
      })
    }

    }
    
}
