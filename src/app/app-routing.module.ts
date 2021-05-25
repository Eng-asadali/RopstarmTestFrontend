import { ExpenseComponent } from './instamunch/expense/expense.component';
import { AddKitchenComponent } from './instamunch/kitchen/add-kitchen/add-kitchen.component';
import { KitchenComponent } from './instamunch/kitchen/kitchen.component';
import { EditOrderComponent } from './instamunch/order/edit-order/edit-order.component';
import { EditComponent } from './instamunch/staff/edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './Services/auth-guard';

import { DashboardComponent } from './Core/dashboard/dashboard.component';
import { CategoryComponent } from './instamunch/category/category.component';
import { ProductComponent } from './instamunch/product/product.component';
import { AddCategoryComponent } from './instamunch/category/add-category/add-category.component';
import { AddProductComponent } from './instamunch/product/add-product/add-product.component';
import { OrderComponent } from './instamunch/order/order.component';
import { StaffComponent } from './instamunch/staff/staff.component';
import { SalesComponent } from './instamunch/Reports/sales/sales.component';
import { AddStaffComponent } from './instamunch/staff/add-staff/add-staff.component';
import { LoginComponent } from './Core/login/login.component';
import { PageNotFoundComponent } from './Core/page-not-found/page-not-found.component';
import { AddExpenseComponent } from './instamunch/expense/add-expense/add-expense.component';
import { LogsComponent } from './instamunch/staff-log/logs/logs.component';
import { AddLogsComponent } from './instamunch/staff-log/add-logs/add-logs.component';
import { QueryListComponent } from './instamunch/staff-log/query-list/query-list.component';
import { AddQueryComponent } from './instamunch/staff-log/add-query/add-query.component';
import { EditQuestionComponent } from './instamunch/staff-log/edit-question/edit-question.component';
import { DealsComponent } from './instamunch/deals/deals.component';
import { AddDealsComponent } from './instamunch/deals/add-deals/add-deal.component';
import { InventoryParentComponent } from './instamunch/inventory/inventoryparent.component';
import { AddparentcategoryComponent } from './instamunch/inventory/addparentcategory/addparentcategory.component';
import { InventoryCategoryComponent } from './instamunch/inventory-category/inventory-category.component';
import { AddInventoryCategoryComponent } from './instamunch/inventory-category/add-category/add-category.component';
import { InventoryVendorComponent } from './instamunch/inventory-vendor/inventory-vendor.component';
import { InventoryVendorAddComponent } from './instamunch/inventory-vendor/inventory-vendor-add/inventory-vendor-add.component';
import { InventoryItemComponent } from './instamunch/inventory-item/inventory-item.component';
import { ItemAddComponent } from './instamunch/inventory-item/item-add/item-add.component';
import { InventoryOrdersComponent } from './instamunch/inventory-orders/inventory-orders.component';
import { AddOrdersComponent } from './instamunch/inventory-orders/add-orders/add-orders.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: DashboardComponent, canActivate: [AuthGuard],

    children: [
      {
        path: '', component: SalesComponent
      },
      { path: 'inventoryparent', component: InventoryParentComponent },
      {
        path: 'inventoryparent/add', component: AddparentcategoryComponent
      },
      {
        path: 'inventoryparent/edit/:id', component: AddparentcategoryComponent
      },
      { path: 'inventorycategory', component: InventoryCategoryComponent },
      {
        path: 'inventorycategory/add', component: AddInventoryCategoryComponent
      },
      {
        path: 'inventorycategory/edit/:id', component: AddInventoryCategoryComponent
      },
      { path: 'inventoryvendor', component: InventoryVendorComponent },
      {
        path: 'inventoryvendor/add', component: InventoryVendorAddComponent
      },
      {
        path: 'inventoryvendor/edit/:id', component: InventoryVendorAddComponent
      },
      { path: 'inventoryitem', component: InventoryItemComponent },
      {
        path: 'inventoryitem/add', component: ItemAddComponent
      },
      {
        path: 'inventoryitem/edit/:id', component: ItemAddComponent
      },
      { path: 'inventoryorders', component: InventoryOrdersComponent },
      {
        path: 'inventoryorders/add', component: AddOrdersComponent
      },
      {
        path: 'inventoryorders/edit/:id', component: AddOrdersComponent
      },
      {
        path: 'inventorycategory/edit/:id', component: InventoryVendorAddComponent
      },
      { path: 'category', component: CategoryComponent },
      {
        path: 'category/add', component: AddCategoryComponent
      },
      {
        path: 'category/edit/:id', component: AddCategoryComponent
      },
      {
        path: 'deals', component: DealsComponent
      },
      {
        path: 'deals/add', component: AddDealsComponent
      },
      {
        path: 'deals/edit/:id', component: AddDealsComponent
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
        path: 'order/edit/:id', component: EditOrderComponent
      },
      {
        path: 'staff', component: StaffComponent
      },
      {
        path: 'staff/add', component: AddStaffComponent
      },
      {
        path: 'staff/edit/:id', component: EditComponent
      },
      {
        path: 'Kitchen', component: KitchenComponent
      },
      {
        path: 'Kitchen/add', component: AddKitchenComponent
      },
      {
        path: 'Kitchen/edit/:id', component: AddKitchenComponent
      },
      {
        path: 'expense', component: ExpenseComponent
      },
      {
        path: 'expense/add', component: AddExpenseComponent
      },
      {
        path: 'expense/edit/:id', component: AddExpenseComponent
      },
      {
        path: 'logs', component: LogsComponent
      },
      {
        path: 'logs/add', component: AddLogsComponent
      },
      {
        path: 'logs/edit/:id', component: AddLogsComponent
      },
      {
        path: 'log/queries/:id', component: QueryListComponent
      },
      {
        path: 'log/query/add/:id', component: AddQueryComponent
      },
      {
        path: 'log/query/edit/:id', component: EditQuestionComponent
      },
      {
        path: 'sales-report', component: SalesComponent
        // resolve: {
        //   cres: SalesReportResolver
        // }
      },
    ]

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
