import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";

//Components
import { FormComponent } from './form/form/form.component';
import { ErrorsComponent } from './form/errors/errors.component';
import { ChartsComponent } from './charts/charts.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({

    entryComponents: [
        // ModalComponent,
        // OrderModalComponent
    ],

    declarations: [
        FormComponent,
        ErrorsComponent,
        ChartsComponent,
        DoughnutChartComponent
    ],

    exports: [
        ErrorsComponent,
        FormComponent,
        ChartsComponent,
        DoughnutChartComponent
    ],

    imports: [
        ReactiveFormsModule,
        CommonModule,
        NgApexchartsModule
    ],

})
export class SharedModule { }