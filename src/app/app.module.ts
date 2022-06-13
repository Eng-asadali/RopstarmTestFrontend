import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,
  MatDatepickerModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import { NgApexchartsModule } from "ng-apexcharts";

import { SharedModule } from './Shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalendarModule} from 'primeng/calendar';
import { QueryParamsHandling } from '@angular/router/src/config';



// import { ModalModule } from 'ngx-bootstrap/modal';


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
import { AuthService } from './Services/auth.service';
import { LoginComponent } from './Core/login/login.component';
import { DashboardComponent } from './Core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './Core/page-not-found/page-not-found.component';
import { MatDialogModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material";

import { twentyfourToTwelevehr } from './Shared/Pipes/twentyfourToTwelevehr';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material';
import { InventoryParentComponent } from './instamunch/inventory/inventoryparent.component';
import { AddparentcategoryComponent } from './instamunch/inventory/addparentcategory/addparentcategory.component';
import { InventoryCategoryComponent } from './instamunch/inventory-category/inventory-category.component';
import { AddInventoryCategoryComponent } from './instamunch/inventory-category/add-category/add-category.component';
import { SignupComponent } from './Core/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    twentyfourToTwelevehr,
    InventoryParentComponent,
    AddparentcategoryComponent,
    InventoryCategoryComponent,
    AddInventoryCategoryComponent,
    SignupComponent,

  ],

  imports: [
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    CalendarModule,
    // ModalModule.forRoot(),
    MatProgressBarModule,
    SharedModule,
    NgApexchartsModule,
    FormsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
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
