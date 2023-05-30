import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProductDTO} from "../DTO/product.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductSubscribe {

  private _products!: ProductDTO[];
  private _productsChanged$ =new BehaviorSubject<ProductDTO[]>([])


  get products(): ProductDTO[] {
    return this._products;
  }

  set products(value: ProductDTO[]) {
    this._products = value;
    this._productsChanged$.next(value);
  }
}
