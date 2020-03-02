import { EditOrderComponent } from './instamunch/order/edit-order/edit-order.component';
import { EditComponent } from './instamunch/staff/edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CategoryComponent } from './instamunch/category/category.component';
import { ProductComponent } from './instamunch/product/product.component';
import { AddCategoryComponent } from './instamunch/category/add-category/add-category.component';
import { AddProductComponent } from './instamunch/product/add-product/add-product.component';
import { OrderComponent } from './instamunch/order/order.component';
import { StaffComponent } from './instamunch/staff/staff.component';
import { SalesComponent } from './instamunch/Reports/sales/sales.component';
import { AddStaffComponent } from './instamunch/staff/add-staff/add-staff.component';

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
  {
    path: 'instamunch/staff/add', component: AddStaffComponent
  },
  {
    path: 'instamunch/staff/edit/:id', component: EditComponent
  },
  {
    path: 'instamunch/sales-report', component: SalesComponent
  },
  {
    path: 'instamunch/order/edit/:id', component: EditOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
