import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from 'src/app/helper/must-match.validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }
  
  public registerForm: FormGroup;
  public name:String = "";
  public last_name:String = "";
  // public age:String = "";
  public gender:String = "";
  public state:String = "";
  public date:String = "";
  public phone:String = "";
  public password:String = "";
  public password_confirm:String = "";
  public submitted:boolean = false;

  @Output() change_index = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      name:             ['', Validators.required],
      last_name:        ['', Validators.required],
      // age:              ['', Validators.required],
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
  
  verify() {
    if (this.password != this.password_confirm) {
      
    }
    return true;
  }
  
  keyPressNumbers(evt:any) {
    let charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 46 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }

  onSubmit(): void {
    this.submitted = true
  }

}