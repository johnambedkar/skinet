import { Component, OnInit } from '@angular/core';
// Look at angular lifecyclehooks page for the events when a component is initialized.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'skinet';
  constructor() {}

  ngOnInit(): void {
   
  }
}
