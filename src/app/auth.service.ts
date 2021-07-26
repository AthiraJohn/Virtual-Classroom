import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loginUser(user:any){
  //   return this.http.post<any>("http://localhost:3000/login",user);
  // }

  constructor(private http:HttpClient) { }
  // rolesVerify(){
  //   let admin=sessionStorage.getItem('user');
  //   if(admin==='admin@gmail.com'){
  //     return true;
  //   }
  // }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  isTeacher(){
    return !!localStorage.getItem('tId');
  }

  isStudent(){
    return !!localStorage.getItem('sId');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  // nameexist(){
  //   return !!localStorage.getItem('name');
  // }
  //teacher signup
  teacherSignup(teacher:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/TsignUp',{'teacher':teacher});
  }
  //teache login
  teacherLogin(teacher:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/Tlogin',{'teacher':teacher});
  }
  //student signup
  studentSignup(student:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/SsignUp',{'student':student});
  }
  //student login
  studentLogin(student:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/Slogin',{'student':student});
  }

}
