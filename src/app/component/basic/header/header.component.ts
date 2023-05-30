import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {PopupService} from "../../../service/popup/popup.service";

@Component({
  selector: 'gc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private popupService: PopupService) {
  }

  @ViewChild('headerBox') headerBox!: ElementRef;
  @Output() pinnedEvent = new EventEmitter<boolean>();
  ngOnInit(): void {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle("is-pinned", e.intersectionRatio < 1);
        if (e.intersectionRatio < 1) {
          this.pinnedEvent.emit(true);
        }else{
          this.pinnedEvent.emit(false);
        }
      },
      { threshold: [1] }
    );
    observer.observe(this.headerBox.nativeElement);
  }
  openSearchPanel(){
    this.popupService.openSearch()
  }
}
