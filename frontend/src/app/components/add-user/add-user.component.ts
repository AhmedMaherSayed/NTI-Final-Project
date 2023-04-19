import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl("" , [Validators.required , Validators.minLength(5)]),
    age: new FormControl("" , [Validators.required , Validators.max(90)]),
    email: new FormControl("", [Validators.required , Validators.email]),
    password: new FormControl("" , [Validators.required]),
    userLevel: new FormControl("" , [Validators.required])
  })
  constructor(private auth : AuthService, private router : Router, private global : GlobalService , private toastr:ToastrService) { }
  get userEmail() {return this.registerForm.get("email")}
  get userData() {return this.registerForm.controls}
  isSubmit = false
  errorMsg : string = ""
  ngOnInit(): void {
  }
  handleAddUser(){
    this.isSubmit = true
    if(this.registerForm.valid){
      this.auth.register(this.registerForm.value).subscribe(res=>{
        console.log(res)

        if(res.apiStatus){
          this.toastr.success('Done!' , 'User Added Successfully')
          this.auth.userRegisterInfo = res.data
          this.router.navigateByUrl('/users');
          window.location.reload()
        }
      },(err)=>{
              console.log(err.error.message)
              this.errorMsg = err.error.message
        })
    }
  }
}
