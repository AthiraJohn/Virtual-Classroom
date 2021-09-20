import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { studentModel } from './studentModel';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {

  constructor(private auth:AuthService) { }
  student: studentModel
  ngOnInit(): void {
    this.auth.listStudents().subscribe((data)=>{
      this.student = JSON.parse(JSON.stringify(data));
      // console.log(this.student);
    })
  }

  //delete a student
  deleteStudent(id:any){
    const retval = confirm('Are you sure you want to delete this student?');
    if(retval){
      this.auth.deleteStudent(id).subscribe((data)=>{
        location.reload();
      })
    }
  }

}
