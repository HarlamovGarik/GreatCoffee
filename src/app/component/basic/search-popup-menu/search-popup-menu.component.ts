import { Component, OnInit } from '@angular/core';
import {Params, Router} from "@angular/router";
import {PopupService} from "../../../service/popup/popup.service";
import {ApiService} from "../../../service/api/api.service";
import {ProductDTO} from "../../../DTO/product.dto";

@Component({
  selector: 'gc-search-popup-menu',
  templateUrl: './search-popup-menu.component.html',
  styleUrls: ['./search-popup-menu.component.scss']
})
export class SearchPopupMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private popupService: PopupService,
    private apiService: ApiService,
  ) {
  }
  public products!: ProductDTO[];
  public searchList!: ProductDTO[];
  ngOnInit(): void {
    this.apiService.getALLProductList().subscribe(res => {
      this.products = res;
    });
  }
  searchProduct(search: string){
    const queryParams: Params = {search};
    this.router.navigate(['/catalog'], {queryParams});
  }
  searchProductList(value: string){
    if(value && value.trim() !=='' && this.products){
      this.searchList = this.products.filter((product: ProductDTO) => product.name.toLowerCase().includes(value))
    }
  }
}
