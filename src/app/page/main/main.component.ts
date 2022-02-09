import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexComponent } from '../../components/index/index.component';
import { SigninComponent } from '../../components/signin/signin.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  
  public index:boolean = true;

  @ViewChild('login') login:IndexComponent;
  @ViewChild('signin') signin:SigninComponent;

  ngOnInit(): void {
  }

  onEvent(event:boolean): void {
    this.index = event;
  }

}
