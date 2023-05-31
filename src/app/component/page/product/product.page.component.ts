import { Component, OnInit } from '@angular/core';
import {FullProductDTO} from "../../../DTO/product.dto";
import {ApiService} from "../../../service/api/api.service";
import {ActivatedRoute} from "@angular/router";
import {BasketStorageService} from "../../../service/storage/basket.storage.service";
import {PopupService} from "../../../service/popup/popup.service";
import {SVG} from "../../../../environments/environment";

@Component({
  selector: 'gc-product.page',
  templateUrl: './product.page.component.html',
  styleUrls: ['./product.page.component.scss']
})

export class ProductPageComponent implements OnInit {
  public product: FullProductDTO = {
    id: 0,
    name: ' Кава CHICCO D\'ORO Espresso l\'Italiano в капсулах  ',
    image: "https://t-coffee.com.ua/image/cache/catalog/image/cache/25940f2b74ca1228580adc2176c48c1c.webp",
    price: 10.99,
    amount: 5,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    review: []
  };
  public svg = SVG;
  constructor(private activatedRote: ActivatedRoute,
              private api: ApiService,
              private popupService: PopupService,
              private basketStorageService: BasketStorageService) { }

  ngOnInit(): void {
    const id = this.activatedRote.snapshot.paramMap.get('id');
    if(id){
      this.api.getProductById(id).subscribe(product => {
        this.product = product
        this.product.userAmount = this.basketStorageService.hasProductById(this.product.id) ? this.basketStorageService.getProductById(this.product.id).userAmount : 1;
      });
    }
  }

  public inBasket(){return this.basketStorageService.hasProductById(this.product.id);}
  public isDisabled(): boolean{return this.product.amount == 0}
  public changeCount(value: number) {
    if (this.product.userAmount && this.product.amount) {
      if (this.product.userAmount + value > 0 && this.product.userAmount + value <= this.product.amount) {
        if (this.basketStorageService.hasProductById(this.product.id)) this.basketStorageService.setProductById(this.product.id, this.product);
        this.product.userAmount += value;
      }
    }
  }
  public addToBasket() {
    if (!this.basketStorageService.hasProductById(this.product.id)) {
      this.basketStorageService.addProduct(this.product);
    } else {
      this.popupService.openBasket()
    }
  }
}
