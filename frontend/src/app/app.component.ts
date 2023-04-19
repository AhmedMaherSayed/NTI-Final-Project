import { GlobalService } from './services/global.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularPostFilter';
  constructor(public global: GlobalService){
    let token = localStorage.getItem("token")
    if(token){
      this.global.loginFlag = true
      this.global.authMe().subscribe(data=>{
        this.global.user = data.data
      })
    }
  }
}
