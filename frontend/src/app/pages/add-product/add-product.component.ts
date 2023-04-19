import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories : any
  errorMsg : string = ""
  imageSrc: any
  productForm = new FormGroup({
    title: new FormControl("" , Validators.required),
    content: new FormControl("" , Validators.required),
    price: new FormControl(0 , Validators.required),
    image: new FormControl("" , Validators.required),
    category: new FormControl("" , Validators.required)
  })
  image: string = ""
  isSubmit = false
  constructor(private global: GlobalService, private router: Router, private toastr: ToastrService) {
  }
  get productData() {return this.productForm.controls}
  ngOnInit(): void {
  }

  addProduct() {
    this.isSubmit = true
    if (this.productForm.valid) {
      this.global.addProduct(this.productForm.value).subscribe(res =>{
        console.log(res)
        if(res.apiStatus){
          this.toastr.success('product added')
          this.router.navigateByUrl('/products')
        }
      },(err)=>{
          this.toastr.error("Failed To Login")
          this.errorMsg = "Try Again Message Or Password Is Incorrect"
        })
    }
  }
  handleImage(ele: any) {
    if (ele.file) {
      this.image = ele.file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(ele.file);
      console.log(this.productForm);
    }
  }

}

