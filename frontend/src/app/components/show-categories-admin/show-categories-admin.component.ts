import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-categories-admin',
  templateUrl: './show-categories-admin.component.html',
  styleUrls: ['./show-categories-admin.component.css']
})
export class ShowCategoriesAdminComponent implements OnInit {
  categories: any;
  constructor(private global : GlobalService , private auth : AuthService , private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  handleGetCategories() {
    this.global.getCategories().subscribe(
      (res) => {
        this.categories = res.data.categories;
      },
      (e) => {
        console.log(e);
      })
  }
  handleDeleteCategory(_id: any, index: any) {
    this.global.deleteCategory(_id).subscribe(res => {
      this.categories.splice(index, 1)
    },(e) => {
      console.log(e);
    })
  }
}
