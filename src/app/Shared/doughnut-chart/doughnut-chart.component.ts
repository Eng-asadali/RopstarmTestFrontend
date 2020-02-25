import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
      plotOptions : ApexPlotOptions,
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() data: any = [];
  @Input() labels: any[];


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor() {
   
   }

  ngOnInit() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },

      labels: ["Team A", "Team B", "Team C", "Team D", ["Insta","hgfgf","hgfnhfg"]],
     
        plotOptions: {
          pie: {
            donut: {
              size: '150px'
            }
          }
        
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            // chart: {
            //   width: 300
            // },
            legend: {
              position: "bottom",
              show:false,
              display:false
            }
          }
        }
      ]
     
    };
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      console.log(this.chart);
      this.data = changes['data'].currentValue;
      // this.chart.updateSeries(this.data);
    }
  }
}
