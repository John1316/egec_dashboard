import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserData: any = new BehaviorSubject(null);

  constructor(
    private _Router:Router
  ) {
    if (localStorage.getItem('currentUserToken')) {
      this.saveCurrentUserToken();
    }
  }
  saveCurrentUserToken() {
    let encodedToken: any = localStorage.getItem('currentUserToken');
    this.currentUserData.next(encodedToken)
  }
  signOut(){
    this.currentUserData.next(null);
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserExpiresIn');
    localStorage.removeItem('currentUserArray');
    this._Router.navigate(['/admin/login']);

  }
}
