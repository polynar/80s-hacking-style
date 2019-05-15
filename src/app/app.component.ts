import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = '80s-hacking-style';
  isOn = true;


  constructor() {
  }

  ngOnInit() {
  }

  turnOff() {
    this.isOn = false;
  }

  turnOn() {
    this.isOn = true;
  }

  ngOnDestroy() {

  }

}
