import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule} from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//ROUTER
import { AppRoutingModule } from './app-routing.module';
//MAIN
import { AppComponent } from './app.component';
//PAGES
import { HomePageComponent } from './component/page/home.page/home.page.component';
import { CatalogPageComponent } from './component/page/catalog.page/catalog.page.component';
import { NotFoundComponent } from './component/page/not-found/not-found.component';
import { AboutUsPageComponent } from './component/page/about-us.page/about-us.page.component';
import { IntroductionPageComponent} from "./component/page/introduction.page/introduction.page.component";
import { ProductPageComponent } from './component/page/product/product.page.component';
//COMPONENTS
import { HeaderComponent } from './component/basic/header/header.component';
import { FooterComponent } from './component/basic/footer/footer.component';
import { ProductTileComponent } from './component/basic/product-tile/product-tile.component';
import { BasketPopupMenuComponent } from './component/basic/basket-popup-menu/basket-popup-menu.component';
import {SearchPopupMenuComponent} from "./component/basic/search-popup-menu/search-popup-menu.component";
import { BasketItemComponent } from './component/basic/basket-item/basket-item.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CatalogPageComponent,
    NotFoundComponent,
    AboutUsPageComponent,
    IntroductionPageComponent,
    ProductPageComponent,
    HeaderComponent,
    FooterComponent,
    ProductTileComponent,
    BasketPopupMenuComponent,
    SearchPopupMenuComponent,
    BasketItemComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
