import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BasketPopupMenuComponent} from "../../component/basic/basket-popup-menu/basket-popup-menu.component";
import {SearchPopupMenuComponent} from "../../component/basic/search-popup-menu/search-popup-menu.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(public dialog: MatDialog) {
  }

  openBasket(custom: {height?: number, width?: number} = {height: 100, width: 50}) {
    this.dialog.open(BasketPopupMenuComponent, {
      panelClass: ['header-list-popup', 'popup-container'],
      height: custom.height + 'vh',
      width: custom.width + '%',
    });
  }
  openSearch(custom: {height?: number, width?: number} = {height: 100, width: 50}) {
    this.dialog.open(SearchPopupMenuComponent, {
      panelClass: ['header-list-popup', 'popup-container'],
      height: custom.height + 'vh',
      width: custom.width + '%',
    });
  }
}
