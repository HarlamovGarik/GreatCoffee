import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDTO} from "../../../DTO/product.dto";
import {BasketStorageService} from "../../../service/storage/basket.storage.service";
import {PopupService} from "../../../service/popup/popup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fc-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {

  constructor(
    private basketService: BasketStorageService,
    private popupService: PopupService,
    private router: Router
  ) {

  }
  @Input() simpleView: boolean = false;
  @Input() last: boolean = false;
  @Input() item!: ProductDTO;
  @Output() deleteEventEmit = new EventEmitter<number>();

  ngOnInit(): void {
    const amount = this.basketService.getProductById(this.item.id).userAmount;
    amount && amount > 1 ? '' : this.item.userAmount = 1;
    this.basketService.setProductById(this.item.id, this.item);
  }

  changeCount(value: number) {
    if(this.item.userAmount && this.item.amount){
      if (this.item.userAmount + value > 0 && this.item.userAmount + value <= this.item?.amount) {
        this.item.userAmount += value;
        this.basketService.setProductById(this.item.id, this.item);
      }
    }
  }
  toRound(number: number){
    return Math.round(number)
  }
  goToPage(){
    this.popupService.dialog.closeAll();
    this.router.navigate(['product/' + this.item.id]);
  }
}
