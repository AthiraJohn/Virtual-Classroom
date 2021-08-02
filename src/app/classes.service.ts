import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(public http:HttpClient) { }
  //get classes of a teacher
  getClassTeacher(id:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/teacherList',{'id':id});
  }
  //Teacher Create Class
  createClass(classData:any){
    return this.http.post('http://localhost:3000/class/create',{'class':classData});
  }
  //get all classes
  getClasses(){
    return this.http.get('http://localhost:3000/class/classList');
  }
  //Student enroll class
  enrollClass(classid:any,id:any){
    return this.http.post('http://localhost:3000/class/enrollClass',{'classid':classid,'id':id})
  }
  //list all enrolled classes of a student
  getClassStudent(id:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/studentlist',{'id':id});
  }
  //get single class details
  getSingleClass(id:any):Observable<any>{
    return this.http.get<any>('http://localhost:3000/class/'+id);
  }

  //update class details teacher
  updateClass(classData:any):Observable<any>{
    console.log(classData);
    return this.http.put<any>('http://localhost:3000/class/update',classData);
  }
  //delete a class
  deleteClass(id:any):Observable<any>{
    return this.http.delete('http://localhost:3000/class/delete/'+id);
  }


  //Create a note (teacher)
  createNote(id:any,noteData:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/createNote',{'noteData':noteData,'id':id});
  }

  //get notes of a class
  getNotes(classId:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/getNotes',{'classId':classId});
  }

  //delete a note
  deleteNote(id:any):Observable<any>{
    return this.http.delete('http://localhost:3000/class/deleteNote/'+id);
  }

  //create assignment
  createAssignment(id:any,assignmentData:any):Observable<any>{
    return this.http.post('http://localhost:3000/class/createAssignment',{'id':id,'assignmentData':assignmentData});
  }

  //get Assignments
  getAssignments(classId:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/getAssignments',{'classId':classId});
  }

  //delete Assignment
  deleteAssignment(id:any):Observable<any>{
    return this.http.delete('http://localhost:3000/class/deleteAssignment/'+id);
  }

  //submit assignment student
  submitAssignment(sid:any,asid:any,submission:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/submitAssignment',{'asid':asid,'submission':submission,'sId':sid});
  }

  //get single assignment details
  getAssignment(asid:any){
    return this.http.post('http://localhost:3000/class/getAssignment',{'asid':asid});
  }

  //get submissions of an Assignment
  getSubmissions(asid:any):Observable<any>{
    return this.http.post('http://localhost:3000/class/submissions',{'asid':asid});
  }

}
