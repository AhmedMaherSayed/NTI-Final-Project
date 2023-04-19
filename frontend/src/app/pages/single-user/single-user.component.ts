import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  userId : any
  singleUser:any
  constructor(private global:GlobalService, private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activated.snapshot.paramMap.get("userId")

    this.global.getSingleUser(this.userId).subscribe(res=>{
      this.singleUser = res.data
      console.log(this.singleUser)
    })
  }

}
