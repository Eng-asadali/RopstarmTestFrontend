import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,
  MatProgressBarModule
} from '@angular/material';

import { SharedModule } from './Shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Services
import { HttpService } from './Services/http.service';
import { InterceptorService } from './Services/interceptor.service';

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
    OrderComponent
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
    SharedModule
  ],

  providers: [HttpService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
