import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes:Routes = [
  {path:'', component: ShopComponent},
  {path:':id', component: ProductDetailsComponent, data:{breadcrumb:{alias:'productDetails'}}}, // use the alias to set the name of the product using breadcrumb service.
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) // routes only availble in shop module.
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
