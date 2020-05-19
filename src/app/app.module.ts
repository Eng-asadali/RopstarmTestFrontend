import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,
  MatDatepickerModule,
  MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { NgApexchartsModule } from "ng-apexcharts";

import { SharedModule } from './Shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Services
import { HttpService } from './Services/http.service';
import { InterceptorService } from './Services/interceptor.service';
import { SalesReportResolver } from './Services/sales-report.resolver';
import { AuthGuardService } from './Services/auth-guard';
import { DataSharingService } from './Services/data-sharing.service';
import { NgSelectModule } from '@ng-select/ng-select';

import { HeaderComponent } from './Core/header/header.component';
import { SidebarComponent } from './Core/sidebar/sidebar.component';
import { FooterComponent } from './Core/footer/footer.component';
import { CategoryComponent } from './instamunch/category/category.component';
import { AuthService } from './Services/auth.service';
import { ProductComponent } from './instamunch/product/product.component';
import { AddCategoryComponent } from './instamunch/category/add-category/add-category.component';
import { AddProductComponent } from './instamunch/product/add-product/add-product.component';
import { StaffComponent } from './instamunch/staff/staff.component';
import { OrderComponent } from './instamunch/order/order.component';
import { SalesComponent } from './instamunch/Reports/sales/sales.component';
import { AddStaffComponent } from './instamunch/staff/add-staff/add-staff.component';
import { EditComponent } from './instamunch/staff/edit/edit.component';
import { EditOrderComponent } from './instamunch/order/edit-order/edit-order.component';
import { LoginComponent } from './Core/login/login.component';
import { DashboardComponent } from './Core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './Core/page-not-found/page-not-found.component';
import { KitchenComponent } from './instamunch/kitchen/kitchen.component';
import { AddKitchenComponent } from './instamunch/kitchen/add-kitchen/add-kitchen.component';
import { ExpenseComponent } from './instamunch/expense/expense.component';
import { AddExpenseComponent } from './instamunch/expense/add-expense/add-expense.component';
import { AddLogsComponent } from './instamunch/staff-log/add-logs/add-logs.component';
import { AddQueryComponent } from './instamunch/staff-log/add-query/add-query.component';
import { EditQuestionComponent } from './instamunch/staff-log/edit-question/edit-question.component';
import { LogsComponent } from './instamunch/staff-log/logs/logs.component';
import { QueryListComponent } from './instamunch/staff-log/query-list/query-list.component';
import {MatDialogModule} from "@angular/material";
import{MatToolbarModule} from "@angular/material";

import {twentyfourToTwelevehr  } from './Shared/Pipes/twentyfourToTwelevehr';
import { DialogBoxComponent } from './instamunch/staff-log/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoryComponent,
    ProductComponent,
    AddCategoryComponent,
    AddProductComponent,
    StaffComponent,
    OrderComponent,
    SalesComponent,
    AddStaffComponent,
    EditComponent,
    EditOrderComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    KitchenComponent,
    AddKitchenComponent,
    ExpenseComponent,
    AddExpenseComponent,
    AddLogsComponent,
    AddQueryComponent,
    EditQuestionComponent,
    QueryListComponent,
    LogsComponent,
    twentyfourToTwelevehr,
    DialogBoxComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressBarModule,
    SharedModule,
    NgApexchartsModule,
    FormsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [HttpService,
    AuthService,
    SalesReportResolver,
    AuthGuardService,
    DataSharingService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
