import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './Services/auth-guard';

import { DashboardComponent } from './Core/dashboard/dashboard.component';
import { LoginComponent } from './Core/login/login.component';
import { SignupComponent  } from './Core/signup/signup.component';
import { PageNotFoundComponent } from './Core/page-not-found/page-not-found.component';
import { InventoryParentComponent } from './instamunch/inventory/inventoryparent.component';
import { AddparentcategoryComponent } from './instamunch/inventory/addparentcategory/addparentcategory.component';
import { InventoryCategoryComponent } from './instamunch/inventory-category/inventory-category.component';
import { AddInventoryCategoryComponent } from './instamunch/inventory-category/add-category/add-category.component';



const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin', component: DashboardComponent, canActivate: [AuthGuard],

    children: [
      
      { path: 'vehicleCategory', component: InventoryParentComponent },
      {
        path: 'vehicleCategory/add', component: AddparentcategoryComponent
      },
      {
        path: 'vehicleCategory/edit/:id', component: AddparentcategoryComponent
      },
      { path: 'vehicle', component: InventoryCategoryComponent },
      {
        path: 'vehicle/add', component: AddInventoryCategoryComponent
      },
      {
        path: 'vehicle/edit/:id', component: AddInventoryCategoryComponent
      }
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
