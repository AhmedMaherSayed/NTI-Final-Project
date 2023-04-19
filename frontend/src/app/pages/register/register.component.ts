import { GlobalService } from './../../services/global.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // userData: User = {
  // name:"",
  // age:"",
  // email:"",
  // password:"",
  // addresses:[
  //   {
  //     addType:"",
  //     mobile:""
  //   }
  // ]
  // }

  registerForm = new FormGroup({
    name: new FormControl("" , [Validators.required , Validators.minLength(5)]),
    age: new FormControl("" , [Validators.required , Validators.max(90)]),
    email: new FormControl("", [Validators.required , Validators.email]),
    password: new FormControl("" , [Validators.required]),
  })
  isSubmit = false
  errorMsg : string = ""
  constructor(private auth : AuthService, private router : Router, private global : GlobalService , private toastr:ToastrService) {

  }

  get userEmail() {return this.registerForm.get("email")}
  get userData() {return this.registerForm.controls}
  ngOnInit(): void {
    if (this.global.loginFlag) {
      this.toastr.warning('You Already Signed In!')
      this.router.navigateByUrl('/')
      return
    }
  }
  handelRegister(){
    this.isSubmit = true
    if(this.registerForm.valid){
      this.auth.register(this.registerForm.value).subscribe(res=>{
        console.log(res)

        if(res.apiStatus){
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userLevel' , res.data.user.userLevel)
          this.toastr.success('Welcome Dear!' , 'Signed Up')
          this.global.loginFlag = true;
          this.auth.userRegisterInfo = res.data
          this.router.navigateByUrl('login')
          window.location.reload()
        }
      },(err)=>{
              console.log(err.error.message)
              this.errorMsg = err.error.message
        })
    }
  }
  // handelRegister(form:NgForm){
  //   console.log(form)
  //   console.log(this.userData)
  //   if(form.valid){
  //     this.auth.register(this.userData).subscribe(res=>{
  //       console.log(res)
  //       this.router.navigateByUrl("login")
  //     },(err)=>{
  //       console.log(err)
  //     })
  //   }
  // }
}
