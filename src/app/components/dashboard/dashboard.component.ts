import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  public user_nick: String = ""
  public obj_user:any = JSON.parse(sessionStorage.getItem("user"))

  ngOnInit(): void {
    if (this.obj_user != null) {
      this.user_nick = this.obj_user.name[0] + this.obj_user.last_name[0]
    }
  }

  signOut(): void {
    sessionStorage.setItem("user", null)
  }

}
