import { Component, OnInit } from '@angular/core';
import {BasketStorageService} from "../../../service/storage/basket.storage.service";;
import {ProductDTO} from "../../../DTO/product.dto";

@Component({
  selector: 'gc-basket-popup-menu',
  templateUrl: './basket-popup-menu.component.html',
  styleUrls: ['./basket-popup-menu.component.scss']
})
export class BasketPopupMenuComponent implements OnInit {

  constructor(
    public basketService: BasketStorageService,
  ) { }

  public basketList: ProductDTO[] = this.basketService.getALLProducts();

  ngOnInit(): void {}

  deleteItemFromBasket(index: number) {
    this.basketService.deleteProduct(index);
    this.basketList= this.basketService.getALLProducts();
  }

  totalPrice(){
    let totalPrice = 0;
    this.basketList.forEach((product:ProductDTO)=>{
      totalPrice += product.userAmount ? Math.round(product.userAmount * product.price) : Math.round(product.price)
    })
    return totalPrice;
  }
}
