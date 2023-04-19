import { GlobalService } from './../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users-admin',
  templateUrl: './show-users-admin.component.html',
  styleUrls: ['./show-users-admin.component.css']
})
export class ShowUsersAdminComponent implements OnInit {
  users: any;

  constructor(public global: GlobalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.global.getUsers().subscribe(user =>{
      console.log(user)
      this.users = user.data
    },(err)=>{
      console.log(err)
    })
  }
  handleChangeStatus(_id: any, index: any, status: any) {
    this.global.changeStatus(_id, status).subscribe(
      (res) => {
        this.users[index].status = !this.users[index].status;
        this.toastr.success('Status Changed Successfully')
      },(e) => {console.log(e)
      this.toastr.error('Failed To Change')}
    );
  }
  handleDeleteUser(_id: any, index: any) {
    this.global.deleteUser(_id).subscribe(res => {
      this.users.splice(index, 1)

    }, e => {console.log(e)})
  }
}
