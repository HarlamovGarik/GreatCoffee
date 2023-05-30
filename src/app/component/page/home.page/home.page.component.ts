import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'gc-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }
  @ViewChild('headerBox') headerBox!: ElementRef;
  ngOnInit(): void {
  }
  public pinned: boolean = false;
  pinnedEvent(value: boolean){
    this.pinned = value;
  }
}
