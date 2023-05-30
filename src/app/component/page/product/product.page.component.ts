import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gc-product.page',
  templateUrl: './product.page.component.html',
  styleUrls: ['./product.page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product = {
    name: 'Название продукта',
    image: 'https://naurok-test2.nyc3.digitaloceanspaces.com/128734/images/741108_1676235175.jpg',
    price: 10.99,
    quantity: 5,
    description: 'Описание продукта'
  };

  constructor() { }

  ngOnInit(): void {
  }

  buyProduct() {
  }


}
