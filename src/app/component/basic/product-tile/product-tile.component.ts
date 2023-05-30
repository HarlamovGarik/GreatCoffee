import {Component, Input, OnInit} from '@angular/core';
import {ProductDTO} from "../../../DTO/product.dto";
import {SVG} from "../../../../environments/environment";
import {BasketStorageService} from "../../../service/storage/basket.storage.service";
import {PopupService} from "../../../service/popup/popup.service";

@Component({
  selector: 'gc-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {

  constructor(
    private basketStorageService: BasketStorageService,
    private popupService: PopupService
  ) { }

  public svg = SVG;
  ngOnInit(): void {
  }

  @Input() item!: ProductDTO;

  inBasket(){return this.basketStorageService.hasProductById(this.item.id);}
  putInBasket() {
    if(!this.isDisabled() && !this.basketStorageService.hasProductById(this.item.id)){
      this.basketStorageService.addProduct(this.item);
    }else if(!this.isDisabled()){
      this.popupService.openBasket();
    }
  }
  isDisabled(): boolean{return this.item.amount == 0}
}
