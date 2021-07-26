import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { classModel } from '../create-class/class.model';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  classes:classModel[]=[];
  constructor(private router:Router,private cs:ClassesService) { }

  ngOnInit(): void {
    this.cs.getClassStudent(localStorage.getItem('sId')).subscribe((data)=>{
      this.classes = JSON.parse(JSON.stringify(data));
      console.log(this.classes);
    })
  }

}
