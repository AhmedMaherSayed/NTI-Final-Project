import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-products-admin',
  templateUrl: './show-products-admin.component.html',
  styleUrls: ['./show-products-admin.component.css']
})
export class ShowProductsAdminComponent implements OnInit {
  products :any = []
  constructor(public global: GlobalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.global.getProducts().subscribe(product=>{
      console.log(product);
      this.products = product.data
    },(err)=>{
      console.log(err)
    })
  }

  handleDeleteProduct(_id: any, index: any) {
    this.global.deleteProduct(_id).subscribe(res =>{
      this.products.splice(index, 1);
    },(e) => {
        console.log(e);
      }
    )
  }
}
