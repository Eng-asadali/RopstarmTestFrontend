import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CategoryComponent } from './instamunch/category/category.component';
import { ProductComponent } from './instamunch/product/product.component';
import { AddCategoryComponent } from './instamunch/category/add-category/add-category.component';
import { AddProductComponent } from './instamunch/product/add-product/add-product.component';
import { OrderComponent } from './instamunch/order/order.component';
import { StaffComponent } from './instamunch/staff/staff.component';
import { SalesComponent } from './instamunch/Reports/sales/sales.component';
import { LoginComponent } from './Core/login/login.component';


import { SalesReportResolver } from './Services/sales-report.resolver';
import { DashboardComponent } from './Core/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './Services/auth-guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full' },
  
  {
    path: 'instamunch', component: DashboardComponent, canActivate: [AuthGuard],

    children: [
      {
        path: '', component: SalesComponent, resolve: {
          cres: SalesReportResolver
        }
      },

      { path: 'category', component: CategoryComponent },
      {
        path: 'category/add', component: AddCategoryComponent
      },
      {
        path: 'category/edit/:id', component: AddCategoryComponent
      },
      {
        path: 'product', component: ProductComponent
      },
      {
        path: 'product/add', component: AddProductComponent
      },
      {
        path: 'product/edit/:id', component: AddProductComponent
      },
      {
        path: 'order', component: OrderComponent
      },
      {
        path: 'staff', component: StaffComponent
      },
      {
        path: 'sales-report', component: SalesComponent, resolve: {
          cres: SalesReportResolver
        }
      },
    ]

  },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
