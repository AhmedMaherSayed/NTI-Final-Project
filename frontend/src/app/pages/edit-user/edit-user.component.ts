import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  errorMsg : string = ""

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required , Validators.email]),
    password: new FormControl("" , [Validators.required , Validators.minLength(5)]),
    name: new FormControl('', [Validators.required]),
    age: new FormControl(20, [Validators.required]),
  })
  isSubmit = false
  get userData() {return this.loginForm.controls}
  userId :any
  constructor(private global: GlobalService,private router: Router,private toastr: ToastrService) {
    if (!this.global.loginFlag){
      this.toastr.warning('Login First..!');
      this.router.navigateByUrl('/login');
    }
    this.global.authMe().subscribe(
      (res) => {
        this.loginForm.patchValue(this.global.user);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  ngOnInit(): void {
  }

  handleEdit() {
    this.isSubmit = true;
    const formData = new FormData();
    const Data: any = { ...this.userData };

    Object.keys(Data).forEach((key) => {
      formData.append(key, Data[key].value);
    });
    this.global.editUser(formData).subscribe(
      (res) => {
        this.global.user = {...this.global.user ,...this.loginForm};
        this.toastr.success('User Edited Successfully')
        this.router.navigateByUrl('/dashboard')
      },(e) => {
        console.log(e);
        this.toastr.error('Failed To Edit Try Again Later')
      }
    );
  }
}
