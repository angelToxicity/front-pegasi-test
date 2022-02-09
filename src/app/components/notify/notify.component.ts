import { Component, OnInit } from '@angular/core';
import * as bootstrap from "node_modules/bootstrap/dist/js/bootstrap";


@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  constructor() { }

  public error: String = ""

  ngOnInit(): void {
  }

  public showNotify(param, e) {
    if(e) {
      this.error = e
    }
    var toastLive = document.getElementById(param)
    var toast = new bootstrap.Toast(toastLive)
    toast.show()
  }
}
