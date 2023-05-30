import {Component, OnInit, Output} from '@angular/core';
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

  @Output() item: ProductDTO | any = {
    amount: 2,
    id: 0,
    image: "https://imperial-coffee.shop/wp-content/uploads/2023/05/4546223695_jelini-marmelad-serdtse.jpg",
    price: 120,
    name: "Jelini, Мармелад «Сердце», жевательный без сахара, в шоубоке 30г 36шт в асортименте"
  }

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
