import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";

//Components
import { FormComponent } from './form/form/form.component';
import { ErrorsComponent } from './form/errors/errors.component';
import { ChartsComponent } from './charts/charts.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

//Pipes
import { removeUnderScore } from './Pipes/removeUnderScore';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltip, MatTooltipModule } from '@angular/material';

@NgModule({

    entryComponents: [
        // ModalComponent,
        // OrderModalComponent
    ],

    declarations: [
        FormComponent,
        ErrorsComponent,
        ChartsComponent,
        DoughnutChartComponent,
        removeUnderScore
    ],

    exports: [
        ErrorsComponent,
        FormComponent,
        ChartsComponent,
        DoughnutChartComponent,
        removeUnderScore,
        MatTooltipModule
    ],

    imports: [
        NgSelectModule,
        ReactiveFormsModule,
        CommonModule,
        NgApexchartsModule,
        MatTooltipModule
    ],

})
export class SharedModule { }