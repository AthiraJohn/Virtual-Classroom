import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { classModel } from './cmodel';


@Component({
  selector: 'app-go-to-class',
  templateUrl: './go-to-class.component.html',
  styleUrls: ['./go-to-class.component.css']
})
export class GoToClassComponent implements OnInit {
  className:String = "";
  description:String = "";
  cls:classModel;
  constructor(private router:Router,private cs:ClassesService) { }

  ngOnInit(): void {
    this.cs.getSingleClass(localStorage.getItem('classId')).subscribe((data)=>{
      this.cls = JSON.parse(JSON.stringify(data))
      this.className = this.cls.className;
      this.description = this.cls.description;
    })
  }

  notes(){
    this.router.navigate(['notes']);
  }

  assignments(){
    this.router.navigate(['assignments']);
  }

}
