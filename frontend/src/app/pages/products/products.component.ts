import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products :any = []
  loadingImg : boolean = true
  constructor(public global:GlobalService) { }

  ngOnInit(): void {
    this.global.getProducts().subscribe(product=>{
      console.log(product);
      this.products = product.data
    },(err)=>{
      console.log(err)
    },()=>{
      this.loadingImg = false
    })
  }

}
