import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  width = '';
  constructor() {}

  ngOnInit(): void {
    this.chatPopup();
  }
  chatPopup() {
    this.width = '25';
    // this.ngOnInit();
  }
  ngOnDestroy(): void {
    this.width = '';
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
}
