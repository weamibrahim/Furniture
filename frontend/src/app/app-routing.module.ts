import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';

import { RegisterComponent } from './Pages/register/register.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';

import { UpdateProductComponent } from './Pages/update-product/update-product.component';
import { ProductsForAdminComponent } from './Pages/products-for-admin/products-for-admin.component';
import { UpdateProfileComponent } from './Pages/update-profile/update-profile.component';
import { CreateProductComponent } from './Pages/create-product/create-product.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { ProductResolver } from './Resolver/ProductResolver';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent,canActivate:[authGuard],resolve:{product:ProductResolver} },
  { path: 'create-product', component: CreateProductComponent,canActivate:[authGuard,adminGuard] },
  { path: 'update-product/:id', component: UpdateProductComponent,canActivate:[authGuard,adminGuard] },
  { path: 'products-for-admin', component: ProductsForAdminComponent,canActivate:[authGuard,adminGuard] },
  { path: 'update-profile', component: UpdateProfileComponent ,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
