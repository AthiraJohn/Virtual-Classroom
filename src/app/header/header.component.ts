import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title:String='Virtual Classroom'
  name:String=''
  constructor(public _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  check(){
    if(!!localStorage.getItem('name')){
        this.name = localStorage.getItem('name');
        return true;
    }
    else{
      return false;
    }
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('tId');
    localStorage.removeItem('sId');
    localStorage.removeItem('name');
    this._router.navigate(['/']);
  }
}
