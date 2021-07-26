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
  enrollClass(classCode:any,id:any){
    return this.http.post('http://localhost:3000/class/enrollClass',{'classCode':classCode,'id':id})
  }
  //list all enrolled classes of a student
  getClassStudent(id:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/class/studentlist',{'id':id});
  }
  //get single class details
  getSingleClass(id:any):Observable<any>{
    return this.http.get<any>('http://localhost:3000/class/'+id);
  }
}
