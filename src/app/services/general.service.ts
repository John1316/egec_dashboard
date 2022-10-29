import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  notepad(
    noteText:any,
    user_id:number,
    postData:any
  ):Observable<any>{
    return this._HttpClient.post(`${environment.apiKey}updateAdminNote?admin_id=${user_id}&admin_note=${noteText}` , postData)
  }
  statistics(): Observable<any>{
    return this._HttpClient.get(`${environment.apiKey}dashboardNumbers?crm_status=1`)
  }
}
