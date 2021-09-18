import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ClassesService } from '../classes.service';
import { classModel } from '../create-class/class.model';
import { assignmentModel } from './assignmentModel';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  title:String="";
  cls:classModel;
  asid:String;
  assignment:assignmentModel;
  assignment2: assignmentModel;
  constructor(public cs:ClassesService,private router:Router,private fb:FormBuilder,public _auth:AuthService) { }

  assignmentForm = this.fb.group({
    title:['',[Validators.required]],
    content:['',[Validators.required]],
  });

  subForm = this.fb.group({
      submission:['',[Validators.required]]
  })
  ngOnInit(): void {
      this.cs.getSingleClass(localStorage.getItem('classId')).subscribe((data)=>{
      this.cls = JSON.parse(JSON.stringify(data));
      this.title = this.cls.className;
    });
      this.cs.getAssignments(localStorage.getItem('classId')).subscribe((data)=>{
        this.assignment = JSON.parse(JSON.stringify(data));
      })
  }
  get fcontrol(){
    return this.assignmentForm.controls;
  }
  //submission form
  get scontrol(){
    return this.subForm.controls;
  }

  createAssignment(){
    this.cs.createAssignment(localStorage.getItem('classId'),this.assignmentForm.value).subscribe(
      res=>{
        alert('Assignment Added');
        location.reload();
      },
      err=>{
        console.log(err.error);
      }
    )
  }

  viewAssignment(link:any){
    // alert(link);
    window.open(link);
  }

  deleteAssignment(id:any){
    this.cs.deleteAssignment(id).subscribe(
      res=>{
        alert('Assignment Removed');
        location.reload();
      },
      err=>{
        console.log(err.error);
      }
    )
  }

  submission(){
    this.cs.submitAssignment(localStorage.getItem('sId'),localStorage.getItem('asid'),this.subForm.value).subscribe(
      res=>{
        alert('Assignment Submitted');
        location.reload();
      },
      err=>{
        alert(err.error);
        console.log(err.error);
        location.reload();
      }
    )
    localStorage.removeItem('asid');
  }

  openform(){
    document.getElementById('myForm').style.display = "block";
  }
  closeform(){
    document.getElementById('myForm').style.display = "none";
  }

  submitFormOpen(id:any){
    document.getElementById('submissionForm').style.display = "block";
    localStorage.setItem('asid',id);
  }
  submitFormClose(){
    document.getElementById('submissionForm').style.display = "none";
  }

  //submissions button
  submissions(id:any){
    localStorage.setItem('asid',id);
    this.router.navigate(['submissions']);
  }

  //submission status
  submissionStatus(asid:any){
    this.cs.getSubmissionStatus(asid,localStorage.getItem('sId')).subscribe(
      res=>{
        // alert('Submission Found');
        // console.log(res[0].submission);
        window.open(res[0].submission);
      },
      err=>{
        alert(err.error);
        console.log(err.error);
      }
    )
  }
}
