import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { AuthService } from '../auth.service';
import { ClassesService } from '../classes.service';
import { classModel } from '../create-class/class.model';
import { noteModel } from './noteModel';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  title:String="";
  cls:classModel;
  note:noteModel;
  constructor(private router:Router,private cs:ClassesService,private fb:FormBuilder,public _auth:AuthService) { }
  noteForm = this.fb.group({
    title:['',[Validators.required]],
    content:['',[Validators.required]]
  })

  ngOnInit(): void {
    this.cs.getSingleClass(localStorage.getItem('classId')).subscribe((data)=>{
      this.cls = JSON.parse(JSON.stringify(data));
      this.title = this.cls.className;
    });
    this.cs.getNotes(localStorage.getItem('classId')).subscribe((data)=>{
      this.note = JSON.parse(JSON.stringify(data));
      console.log(this.note);
    })

  }

  get fcontrol(){
    return this.noteForm.controls;
  }

  viewNote(link:any){
    // alert(link);
    window.open(link);
  }

  createNote(){
    this.cs.createNote(localStorage.getItem('classId'),this.noteForm.value).subscribe(
      res=>{
        alert('Note added')
      },
      err=>{
        console.log(err.error);
      }
    )
    document.getElementById('myForm').style.display = 'none';
    location.reload();
  }

  deleteNote(id:any){
    this.cs.deleteNote(id).subscribe(
      res=>{
        alert('Note Removed');
        location.reload();
      },
      err=>{
        console.log(err.error);
      }
    )
  }

  openform(){
    document.getElementById('myForm').style.display = "block";
  }
  closeform(){
    document.getElementById('myForm').style.display = "none";
  }
}
