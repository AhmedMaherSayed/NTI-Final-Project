import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private global: GlobalService, private router: Router, private toastr: ToastrService) {
    if (!global.loginFlag && global.user.userLevel != 'admin') {
      this.toastr.warning("Sorry Admin Only!!")
      router.navigateByUrl('/login')
      return
    }
  }

  ngOnInit(): void {
  }

}
