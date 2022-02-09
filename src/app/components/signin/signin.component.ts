import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from 'src/app/helper/must-match.validator';
import { ApiService } from "../../communication/api.service";
import { NotifyComponent } from "../notify/notify.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private route: Router
  ) { }
  
  public registerForm: FormGroup;
  public name:String = "";
  public last_name:String = "";
  public gender:String = "";
  public state:String = "";
  public date:String = "";
  public phone:String = "";
  public password:String = "";
  public password_confirm:String = "";
  public submitted:boolean = false;
  public request:boolean = false;
  public user:any = {};
  public auth:any = {};
  public error:any;

  @ViewChild("notify") notify:NotifyComponent;
  @Output() change_index = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      name:             ['', Validators.required],
      last_name:        ['', Validators.required],
      email:            ['', [Validators.required, Validators.email]],
      gender:           ['', Validators.required],
      state:            ['', Validators.required],
      date:             ['', Validators.required],
      phone:            ['', Validators.required],
      password:         ['', Validators.required],
      password_confirm: ['', Validators.required]

    },
    {
      validator: MustMatch('password', 'password_confirm')
    });
  }

  // Controlador de form.
  get f() {

    return this.registerForm.controls;

  }

  login(): void {
    this.change_index.emit(true);
  }
  
  keyPressNumbers(evt:any) {
    let charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 46 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true
    this.request = true
    if (this.f.state.status == "INVALID" && this.f.gender.value == "M") {
      this.f.state.setValue("N/A")
      this.request = false
    }

    if (this.registerForm.invalid) {
      this.request = false
      return false;
    }

    this.auth = {
      email: this.f.email.value,
      password: this.f.password.value
    }
    
    this.user = {
      name: this.f.name.value,
      last_name: this.f.last_name.value,
      email: this.f.email.value,
      gender: this.f.gender.value,
      state: this.f.state.value,
      date: this.f.date.value,
      phone: this.f.phone.value
    }

    this.api.registerUser({
      auth: this.auth,
      user: this.user
    }).subscribe(r => {
      this.notify.showNotify("liveToastSuccess", null)
      sessionStorage.setItem("user", JSON.stringify(this.user))
      setTimeout(() => {
        this.route.navigate(['/user'])
      }, 3000);
    }, err => {
      this.request = false
      this.notify.showNotify("liveToastError", err.error.message)
    })
  }

}