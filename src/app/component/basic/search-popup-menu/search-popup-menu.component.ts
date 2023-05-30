import { Component, OnInit } from '@angular/core';
import {Params, Router} from "@angular/router";

@Component({
  selector: 'gc-search-popup-menu',
  templateUrl: './search-popup-menu.component.html',
  styleUrls: ['./search-popup-menu.component.scss']
})
export class SearchPopupMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
  searchProduct(search: string){
    const queryParams: Params = {search};
    this.router.navigate(['/catalog'], {queryParams});
  }
  searchProductList(value: string){

  }
}
