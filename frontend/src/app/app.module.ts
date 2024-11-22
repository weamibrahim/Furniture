import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { CreateProductComponent } from './Pages/create-product/create-product.component';
import { UpdateProductComponent } from './Pages/update-product/update-product.component';
import { ProductsForAdminComponent } from './Pages/products-for-admin/products-for-admin.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { UpdateProfileComponent } from './Pages/update-profile/update-profile.component';
import { HeaderComponent } from './Parts/header/header.component';
import { FooterComponent } from './Parts/footer/footer.component';



import { HomeComponent } from './Pages/home/home.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SearchByNameComponent } from './Parts/search-by-name/search-by-name.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchByCategoryComponent } from './Parts/search-by-category/search-by-category.component';
import { LoadingComponent } from "./Parts/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProductsForAdminComponent,
    LoginComponent,
    RegisterComponent,
    UpdateProfileComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchByNameComponent,

    SearchByCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
