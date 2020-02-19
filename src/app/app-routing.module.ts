import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CategoryComponent } from './instamunch/category/category.component';
import { ProductComponent } from './instamunch/product/product.component';
import { AddCategoryComponent } from './instamunch/category/add-category/add-category.component';
import { AddProductComponent } from './instamunch/product/add-product/add-product.component';
import { OrderComponent } from './instamunch/order/order.component';
import { StaffComponent } from './instamunch/staff/staff.component';

const routes: Routes = [
  {
    path: 'instamunch/category', component: CategoryComponent
  },
  {
    path: 'instamunch/category/add', component: AddCategoryComponent
  },
  {
    path: 'instamunch/category/edit/:id', component: AddCategoryComponent
  },
  {
    path: 'instamunch/product', component: ProductComponent
  },
  {
    path: 'instamunch/product/add', component: AddProductComponent
  },
  {
    path: 'instamunch/product/edit/:id', component: AddProductComponent
  },
  {
    path: 'instamunch/order', component: OrderComponent
  },
  {
    path: 'instamunch/staff', component: StaffComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
