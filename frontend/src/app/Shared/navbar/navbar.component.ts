import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public global : GlobalService , public toastr : ToastrService) { }

  ngOnInit(): void {

  }

  handleLogout() {
    const token = localStorage.getItem('token');
    this.global.logout().subscribe(
      (res: any) => {
        this.toastr.success('logged out');
        localStorage.removeItem('token');
        this.global.loginFlag = false;
        this.global.user.userLevel = 'customer';
      },
      (e) => {
        console.log(e);
        this.toastr.error('logging out failed');
      }
    );
  }
  isAdmin() {
    return (
      this.global.user?.userLevel == 'admin'
    );
  }
}
