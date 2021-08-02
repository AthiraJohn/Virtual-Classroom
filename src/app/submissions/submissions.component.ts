import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assignmentModel } from '../assignments/assignmentModel';
import { ClassesService } from '../classes.service';
import { dataModel } from './dataModel';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  asName:String='';
  assignment:assignmentModel;
  submissionData:dataModel;
  constructor(private cs:ClassesService, private router:Router) { }

  ngOnInit(): void {
    this.cs.getAssignment(localStorage.getItem('asid')).subscribe((data)=>{
      this.assignment = JSON.parse(JSON.stringify(data));
      this.asName = this.assignment.title;
    })
    this.cs.getSubmissions(localStorage.getItem('asid')).subscribe((data)=>{
      this.submissionData = JSON.parse(JSON.stringify(data));
      console.log(this.submissionData);
    })

  }
  gotoSubmission(link:any){
    window.open(link);
  }

}
