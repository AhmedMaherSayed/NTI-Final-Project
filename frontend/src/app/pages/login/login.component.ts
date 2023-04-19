import { GlobalService } from './../../services/global.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Login } from './../../interfaces/login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user:Login = {
  //   email:"",
  //   password:""
  // }
  errorMsg : string = ""

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required , Validators.email]),
    password: new FormControl("" , [Validators.required , Validators.minLength(5)])
  })
  isSubmit = false

  constructor(private auth : AuthService, private global : GlobalService, private router : Router, private toastr:ToastrService) { }

  get userEmail() {return this.loginForm.get("email")}
  get userData() {return this.loginForm.controls}

  ngOnInit(): void {
    if (this.global.loginFlag) {
      this.toastr.warning('You Already Signed In')
      this.router.navigateByUrl('/')
      return
    }
  }
  handleSubmit(){
    this.isSubmit = true
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(res=>{
        console.log(res)
        if(res.apiStatus) {
          this.toastr.success('Welcome!', 'Logged In!');
          localStorage.setItem('userLevel' , res.data.user.userLevel)
          localStorage.setItem('token', res.data.token)
          this.global.loginFlag = true;
          this.auth.userInfo = res.data
          this.router.navigateByUrl('/');
          window.location.reload()
          
          // if(userLevel == "admin"){
          //   this.router.navigateByUrl('dashboard/add-admin')
          // }else if(userLevel == "customer"){
          //   this.router.navigateByUrl('products')
          // }
        }
      },(err)=>{
              this.toastr.error("Failed To Login")
              this.errorMsg = "Try Again Message Or Password Is Incorrect"
        })
    }
  }
  // handleLogin(form:NgForm){
  //   if(form.valid){
  //     this.auth.login(this.user).subscribe(res=>{
  //       console.log(res)
  //       localStorage.setItem('token' , res.data.token)
  //       if(res.apiStatus) {
  //         this.toastr.success('Welcome!', 'Logged In!');
  //         this.auth.loginFlag = false
  //         this.router.navigateByUrl('')
  //       }
  //     },(err)=>{
  //       console.log(err.error.message)
  //       this.errorMsg = err.error.message
  //     })
  //   }
  // }
}
