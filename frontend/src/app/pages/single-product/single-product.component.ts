import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  productId : any
  singleProduct:any
  constructor(private global:GlobalService, private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.activated.snapshot.paramMap.get("productId")

    this.global.getSingleProduct(this.productId).subscribe(product=>{
      this.singleProduct = product.data
      console.log(this.singleProduct)
    })
  }

}
