import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public navabarFlag = false
  urlPath = "http://localhost:3000/"
  loginFlag: boolean = false
  user: any = {
    userLevel: 'customer'
  }
  constructor(private http:HttpClient) { }
  addProduct(obj : any): Observable<any> {
    return this.http.post(`${this.urlPath}product/add`,obj)
  }
  getProducts():Observable<any>{
    return this.http.get(`${this.urlPath}product/all`)
  }
  getSingleProduct(_id:any):Observable<any>{
    return this.http.get(`${this.urlPath}product/single/${_id}`)
  }
  deleteProduct(_id:any): Observable<any> {
    return this.http.delete(`${this.urlPath}product/delete/${_id}`)
  }
  addCategory(name: any): Observable<any> {
    return this.http.post(`${this.urlPath}category/add`, {name})
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.urlPath}category/all`)
  }
  deleteCategory(_id:any): Observable<any> {
    return this.http.delete(`${this.urlPath}category/del/${_id}`)
  }
  userImage(obj : any):Observable<any>{
    return this.http.post(`${this.urlPath}user/profile` , obj)
  }
  authMe():Observable<any>{
    return this.http.get(`${this.urlPath}user/me`)
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.urlPath}user/all`)
  }
  getSingleUser(_id : any): Observable<any> {
    return this.http.get(`${this.urlPath}user/single/${_id}`)
  }
  editUser(data:any): Observable<any> {
    return this.http.put(`${this.urlPath}user/edit`, data)
  }
  deleteUser(_id: any): Observable<any> {
    return this.http.delete(`${this.urlPath}user/del/${_id}`)
  }
  changeStatus(_id: any, status: any): Observable<any> {
    return this.http.patch(`${this.urlPath}user/editStatus/${_id}`, {status})
  }
  logout(): Observable<any> {
    return this.http.post(`${this.urlPath}user/logout` , null);
  }
}
