import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiService} from "../../../service/api/api.service";
import {ProductDTO} from "../../../DTO/product.dto";
import {CategoriesDTO} from "../../../DTO/categories.dto";


@Component({
  selector: 'gc-catalog',
  templateUrl: './catalog.page.component.html',
  styleUrls: ['./catalog.page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  public products!: ProductDTO[];
  public filteredData: ProductDTO[] = [];
  public categories: CategoriesDTO[] = [];
  private sortedColumn: string | undefined = "";

  constructor(
    protected apiService: ApiService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const searchValue = params.get('search') || undefined;
      const orderByValue = params.get('order') || undefined;
      this.applySearchByOption(searchValue);
      this.applyNewOrder(orderByValue);
    });
  }
  protected getData(){
    this.activatedRoute.params.subscribe(params => {
      const parentId = params['id-parent-catalog'];
      const id = params['id-catalog'];

      if(!id && !parentId){
        console.log('all')
        this.apiService.getAllParentCategories().subscribe(res =>{
          this.categories = res;
          console.log('parents id')
        })
        this.apiService.getALLProductList().subscribe(res => {
          this.products = res;
          console.log('all products id')
          this.filteredData = this.products;
        });
      }

      if (parentId == 'all') {
        this.router.navigate(['']);
        return;
      }


      if (parentId && !id) {
        console.log(parentId)
        this.apiService.getALLProductListByParentCategories(parentId).subscribe(res => {
          this.products = res;
          console.log('products by parent categories id')
          this.filteredData = this.products;
        });

        this.apiService.getAllCategoriesByParent(parentId).subscribe(res =>{
          this.categories = res;
          console.log('categories by parent id')
        })

      } else if(id){
        console.log(id)
        this.apiService.getALLProductListByCategories(id).subscribe(res => {
          this.products = res;
          console.log('products by categories id')
          this.filteredData = this.products;
        });
      }
    });
  }

  applySearchByOption(searchValue: string | undefined, option='name') {
    if(searchValue && searchValue.trim() !=='' && this.products){
      // @ts-ignore
      this.filteredData = this.products.filter((product: ProductDTO) => product[option].toLowerCase().includes(searchValue))
    }else this.filteredData = this.products
  }

  applyNewOrder(order: string | undefined) {
    if(order != undefined) {
      this.filteredData.sort((a, b) => this.compare(a,b,order))
      this.sortedColumn = order;
    }
  }

  compare(a: ProductDTO, b: ProductDTO, order: string): number {
    let comparison = 0;
    switch (order) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
    }

    return order !== this.sortedColumn ? -comparison : comparison;
  }
}
