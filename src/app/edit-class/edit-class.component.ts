import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getJSDocClassTag } from 'typescript';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  title:String="Edit Class";
  createClassform:FormGroup
  constructor(private fb:FormBuilder,private router:Router,private cs:ClassesService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('editid');
    this.getClass(id)
    this.createClassform = this.fb.group({
      className:['',[Validators.required]],
      classCode:['',[Validators.required]],
      classid:[''],
      description:['',[Validators.required]],
      tId:[localStorage.getItem('tId')]
    })
  }

  get fcontrol(){
    return this.createClassform.controls;
  }

  getClass(id:any){
    console.log(id);
    this.cs.getSingleClass(id).subscribe(data=>{
      this.createClassform.setValue({
        className:data['className'],
        classCode:data['classCode'],
        classid:data['_id'],
        description:data['description'],
        tId:localStorage.getItem('tId')
      })
    })

  }

  updateClass(){
    this.cs.updateClass(this.createClassform.value).subscribe(
      res=>{
        alert('Details Updated');
        this.router.navigate(['teacherHome']);
      },
      err=>{
        console.log(err.error);
      }
    )
  }

}
