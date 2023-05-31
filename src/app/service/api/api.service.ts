import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {FullProductDTO, ProductDTO} from "../../DTO/product.dto";
import {CategoriesDTO} from "../../DTO/categories.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BACKEND_URL = environment.BACKEND_URL; //Need set url

  constructor(
    private http: HttpClient
  ) {
  }

  getAllParentCategories(): Observable<CategoriesDTO[]> {
    return this.http.get<CategoriesDTO[]>(`${this.BACKEND_URL}/get/parents`)
  }

  getALLProductList(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.BACKEND_URL}/get/product/all`)
  }

  getALLProductListByParentCategories(parentId: number): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.BACKEND_URL}/get/product/by/parentCategory/${parentId}`)
  }

  getAllCategoriesByParent(parentId: number): Observable<CategoriesDTO[]> {
    return this.http.get<CategoriesDTO[]>(`${this.BACKEND_URL}/get/subcategories/${parentId}`)
  }

  getALLProductListByCategories(id: number): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.BACKEND_URL}/get/product/category/${id}`)

  }

  getProductById(productId: string): Observable<FullProductDTO> {
    return this.http.get<FullProductDTO>(`${this.BACKEND_URL}/get/product/by/id/${productId}`);
  }

  postNewComment(productId: number, comment: string): Observable<FullProductDTO> {
    return this.http.post<FullProductDTO>(`${this.BACKEND_URL}/create/${productId}`, comment);
  }
}
