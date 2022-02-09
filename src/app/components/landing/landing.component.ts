import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild("dash") dashboard:DashboardComponent;

  constructor() { }

  public user:String = ""
  public obj_user:any = JSON.parse(sessionStorage.getItem("user"))

  ngOnInit(): void {
    if (this.obj_user != null) {
      this.user = this.obj_user.name + " " + this.obj_user.last_name
    } else {
      location.replace("/main");
    }
  }

  parseDate(date) {
    return new Date(date).toLocaleDateString("en-GB")
  }
  
  parseGender(gender) {
    if (gender == "M") {
      return ("Masculino")
    }
    return "Femenino"
  }
}
