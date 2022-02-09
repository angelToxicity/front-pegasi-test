import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  constructor() { }
  
  @Output() change_view = new EventEmitter<boolean>();

  ngOnInit(): void { }
  
  signin(): void {
    this.change_view.emit(false);
  }

}
