import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  login(
    postData:any
  ): Observable<any>{
    return this._HttpClient.post(`${environment.apiKey}auth/signin`, postData )
  }
}
