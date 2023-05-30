import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./component/page/home.page/home.page.component";
import {CatalogPageComponent} from "./component/page/catalog.page/catalog.page.component";
import {NotFoundComponent} from "./component/page/not-found/not-found.component";
import {IntroductionPageComponent} from "./component/page/introduction.page/introduction.page.component";
import {ProductPageComponent} from "./component/page/product/product.page.component";


const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [
      {
        path: '',
        component: IntroductionPageComponent,
        children: [
          {path: '', component: CatalogPageComponent},
          {path: 'catalog', redirectTo: '', pathMatch: 'full'},
          {path: ':id-parent-catalog', component: CatalogPageComponent},
          {path: ':id-parent-catalog/:id-catalog', component: CatalogPageComponent},
          {path: 'not-found', component: NotFoundComponent}
        ]
      },
      {path: 'product/:id', component: ProductPageComponent},
    ]
  },
  {
    path: '**', redirectTo: 'not-found', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
