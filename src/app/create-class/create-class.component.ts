import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ROUTER_INITIALIZER } from '@angular/router';
import { ClassesService } from '../classes.service';
import { classModel } from './class.model';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  title:String = "Create a Class";
  // classes: classModel[]=[];
  createClassform = this.fb.group({
    className:['',[Validators.required]],
    classCode:['',[Validators.required]],
    description:['',[Validators.required]],
    tId:[localStorage.getItem('tId')]
  })
  constructor(private fb:FormBuilder,private router:Router,private cs:ClassesService) {}

  ngOnInit(): void {
    
  }
  get fcontrol(){
    return this.createClassform.controls;
  }

  createClass(){
    this.cs.createClass(this.createClassform.value).subscribe(
      res=>{
        alert('Class Created');
        this.router.navigate(['teacherHome']);
      },
      err=>{
        alert(err.error);
        console.log(err);
        window.location.reload();
      }
    )
  }

}
