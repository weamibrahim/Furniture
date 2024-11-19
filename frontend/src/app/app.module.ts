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

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { HomeComponent } from './Pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,



    MdbAccordionModule,
    MdbCarouselModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbModalModule,
    MdbTooltipModule,
    MdbPopoverModule,
    MdbRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
