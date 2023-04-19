import { GlobalService } from './../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category-admin',
  templateUrl: './add-category-admin.component.html',
  styleUrls: ['./add-category-admin.component.css']
})
export class AddCategoryAdminComponent implements OnInit {
name :any
  constructor(private global: GlobalService , private toastr: ToastrService) { }
  handleAddCategory() {
    this.global.addCategory(this.name).subscribe(
      (res) => {
        this.toastr.success(`${this.name} Category Added Successfully`);
      },(e) => {
        console.log(e);
        this.toastr.error('Failed To Add Category');
      }
    );
  }
  ngOnInit(): void {
  }

}
