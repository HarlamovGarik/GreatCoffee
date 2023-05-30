import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BasketPopupMenuComponent} from "../../component/basic/basket-popup-menu/basket-popup-menu.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(public dialog: MatDialog) {
  }

  openBasket(custom: {height?: number, width?: number} = {height: 65, width: 50}) {
    this.dialog.open(BasketPopupMenuComponent, {
      panelClass: ['header-list-popup', 'popup-container'],
      height: custom.height + '%',
      width: custom.width + '%',
    });
  }
}
