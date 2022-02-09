import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../communication/api.service";
import { NotifyComponent } from "../notify/notify.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  constructor(private api:ApiService, private formBuilder: FormBuilder, private route: Router) { }

  public loginForm: FormGroup;
  public submitted: boolean = false;
  public request: boolean = false;
  
  @ViewChild("notify") notify:NotifyComponent;
  @Output() change_view = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email:    ['', [Validators.required, Validators.email]],
      password_login: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.submitted = true
    this.request = true
    if (this.loginForm.invalid) {
      this.request = false
      return false;
    }
    
    this.api.loginUser({
      email: this.f.email.value,
      password: this.f.password_login.value
    }).subscribe((r:any) => {
      this.notify.showNotify("liveToastLogin", null)
      sessionStorage.setItem("user", JSON.stringify(r.user))
      setTimeout(() => {
        this.route.navigate(['/user'])
      }, 3000);
    }, err => {
      this.request = false
      let e = null
      if (err.error.message) {
        e = err.error.message
      } else {
        e = "Sin conexion"
      }
      this.notify.showNotify("liveToastError", e)
    })
  }
  
  signin(): void {
    this.change_view.emit(false);
  }

}
