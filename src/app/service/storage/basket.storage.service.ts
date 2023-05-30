import { Injectable } from '@angular/core';
import {ProductDTO} from "../../DTO/product.dto";

@Injectable({
  providedIn: 'root'
})
export class BasketStorageService {
  private storageKey = 'products';

  constructor() {
  }

  getALLProducts(): ProductDTO[] {
    return JSON.parse(<string>localStorage.getItem(this.storageKey)) || [];
  }

  clearALLProducts(): void {
    localStorage.removeItem(this.storageKey);
  }

  addProduct(product: ProductDTO): void {
    const products = this.getALLProducts();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(productId: number): void {
    const products = this.getALLProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
  }

  setProductById(productId: number, updatedProduct: any): void {
    const products = this.getALLProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index >= 0) {
      products[index] = { ...products[index], ...updatedProduct };
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  hasProductById(productId: number): boolean {
    const products = this.getALLProducts();
    return products.some(p => p.id === productId);
  }

  getProductById(productId: number): ProductDTO {
    const products = this.getALLProducts();
    return products.filter(p => p.id == productId)[0];
  }

  isNotEmpty(): boolean{
    const productsString = localStorage.getItem(this.storageKey);
    return !!productsString && productsString != '[]';
  }
}
