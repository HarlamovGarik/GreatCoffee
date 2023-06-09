import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {ApiService} from "../../../service/api/api.service";
import {ProductDTO} from "../../../DTO/product.dto";
import {CategoriesDTO} from "../../../DTO/categories.dto";

@Component({
  selector: 'gc-catalog',
  templateUrl: './catalog.page.component.html',
  styleUrls: ['./catalog.page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  public parentCategories!: CategoriesDTO[];
  public products!: ProductDTO[];
  public filteredData!: ProductDTO[];
  public categories!: CategoriesDTO[];
  private sortedColumn: string | undefined = "";
  public order: string = '';
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  changeOrder(order: string) {
    const queryParams: Params = {order};
    this.router.navigate([], {queryParams, queryParamsHandling: 'merge'});
  }

  protected getData(){
    this.activatedRoute.params.subscribe(params => {
      const parentId = params['id-parent-catalog'];
      const id = params['id-catalog'];
      const product = params['product'];
      console.log(product)
      this.apiService.getAllParentCategories().subscribe(res =>{
        this.parentCategories = res;
      })

      if(!id && !parentId){
        console.log('all')
        this.apiService.getAllParentCategories().subscribe(res =>{
          this.categories = res;
        })
        this.apiService.getALLProductList().subscribe(res => {
          this.products = res;
          this.filteredData = res;
        });
      }

      if (parentId == 'all' || id == 'all') {
        this.router.navigate(['']);
        return;
      }


      if (parentId && !id) {
        console.log(parentId)
        this.apiService.getALLProductListByParentCategories(parentId).subscribe(res => {
          this.products = res;
          this.filteredData = res;
        });

        this.apiService.getAllCategoriesByParent(parentId).subscribe(res =>{
          this.categories = res;
        })

      } else if(id){
        console.log(id)
        this.apiService.getALLProductListByCategories(id).subscribe(res => {
          this.products = res;
          this.filteredData = res;
        });
      }
    });
  }
  public prevStep(){
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  public applySearchByOption(searchValue: string | undefined, option='name') {
    if(searchValue && searchValue.trim() !=='' && this.products){
      // @ts-ignore
      this.filteredData = this.products.filter((product: ProductDTO) => product[option].toLowerCase().includes(searchValue))
    }else this.filteredData = this.products
  }
  public applyNewOrder(order: string | undefined) {
    if(order != undefined) {
      this.filteredData.sort((a, b) => this.compare(a,b,order))
      this.sortedColumn = order;
    }
  }
  public compare(a: ProductDTO, b: ProductDTO, order: string): number {
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
    if(order == "CHEAP"){
      comparison = b.price - a.price;
    }else if(order == "EXPANSIVE"){
      comparison = a.price - b.price;
    }

    return order !== this.sortedColumn ? -comparison : comparison;
  }
}
