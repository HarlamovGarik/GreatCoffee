import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {PopupService} from "../../../service/popup/popup.service";
import {BasketStorageService} from "../../../service/storage/basket.storage.service";

@Component({
  selector: 'gc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private popupService: PopupService,
    private basketService: BasketStorageService) {
  }
  public window: any = window;
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
    this.popupService.openSearch();
  }
  openBasketPanel(){
    this.popupService.openBasket();
  }
  countInBasket(): number{
    return this.basketService.getALLProducts().length;
  }
}
