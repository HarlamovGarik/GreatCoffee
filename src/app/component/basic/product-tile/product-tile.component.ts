import {Component, OnInit, Output} from '@angular/core';
import {ProductDTO} from "../../../DTO/product.dto";

@Component({
  selector: 'gc-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output() item: ProductDTO = {
    amount: 0,
    id: 0,
    image: "",
    price: 120,
    name: "Продукт"
  }
}
