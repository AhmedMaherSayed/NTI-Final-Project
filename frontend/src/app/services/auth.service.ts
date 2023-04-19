import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlPath = "http://localhost:3000/"
  public loginFlag = true
  public userInfo:any={}
  public userRegisterInfo:any={}
  constructor(private http : HttpClient) { }

  register(obj:any):Observable<any>{
    return this.http.post(`${this.urlPath}user/register` , obj)
  }
  login(obj:any):Observable<any>{
    return this.http.post(`${this.urlPath}user/login`, obj)
  }
}
