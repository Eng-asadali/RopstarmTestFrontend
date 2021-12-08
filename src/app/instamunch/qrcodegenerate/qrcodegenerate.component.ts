// import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../Services/order.service';

// import * as moment from 'moment';
// import { ApiResponse } from 'src/app/Interfaces/response';
import * as kjua from 'kjua-svg';
import jsPDF from 'jspdf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { DateUtils } from 'src/app/Utils/date-utils';

@Component({
  selector: 'app-qrcodegenerate',
  templateUrl: './qrcodegenerate.component.html',
  styleUrls: ['./qrcodegenerate.component.css']
})
export class QrcodegenerateComponent implements OnInit {
  @ViewChild('tableData') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = ['select', 'imei', 'device_type']; //'added_by','package', 'status',
  minDate = new Date(Date.now())
  modalRef: any;
  lengthDataSource: any;
  dataSourcePageSize: number = 10;
  pageInfo = { pageIndex: 0, pageSize: 10, offset: 0 };
  offset: any;
  limit: any;
  progressBar: boolean;
  displayNoRecords: boolean = false;
  date: any;
  startDate: Date
  datePicker: any;
  editForm: FormGroup;
  submitted: boolean = false;
  device_ID: any;
  productList = ['Gateway', 'Edge']
  versionList = ['v1.0', 'v1.1', 'v2.0']
  statusList = ['Available', 'Faulty', 'Sold']
  statusId = ''
  currentDate = new Date();
  public manufacturing_date: Date;
  package_id: any;
  user_read_only: boolean;

  filterValue;
  idArray = [];
  useCaseList = [{ id: 1, name: 'Fleet Management' }, { id: 2, name: 'Asset Management' }]
  packageList = [{ id: 5, name: 'FMS - Plug & Go', usecase: 1 }, { id: 6, name: 'FMS - Advance', usecase: 1 }, { id: 8, name: 'AT - Basic', usecase: 6 }, { id: 9, name: 'AT - Plug & Go', usecase: 6 }, { id: 10, name: 'AT - Advance', usecase: 6 }, { id: 11, name: 'AT - Enterprise', usecase: 6 }]
  numberofsimList = [{ id: 1, name: 'Single Sim' }, { id: 2, name: 'Dual Sim' }]
  typeofsimList = [{ id: 1, name: 'Nano' }, { id: 2, name: 'Micro' }]
  usecase: any;
  deviceTypeList = [];
  user: any;
  loggen_in_user: any;

  /**
* PDF
*/
  columnsPerPage = 3;
  rowsPerPage = 8;
  pageWidth = 210;
  pageHeight = 297;
  // Avery 3490
  cellWidth = 36;
  cellHeight = 36;
  borderTopBottom = ((this.pageHeight - (this.rowsPerPage * this.cellHeight)) / 2);
  static getBarcodeData(text: string, size = 900) {
    return kjua({
      render: "canvas",
      crisp: true,
      minVersion: 1,
      ecLevel: "Q",
      size: size,
      ratio: undefined,
      fill: "#333",
      back: "#fff",
      text,
      rounded: 10,
      quiet: 2,
      mode: "label",
      mSize: 5,
      mPosX: 50,
      mPosY: 100,
      label: text,
      fontname: "sans-serif",
      fontcolor: "#3F51B5",
      image: undefined
    });
  }

  constructor(private OrderService: OrderService) {
    this.getTableData();
  }

  ngOnInit() {
 


  }
  getTableData() {
    this.offset = 0;
    this.limit = this.pageInfo.pageSize;
    this.progressBar = true;
    this.dataSource = new MatTableDataSource([]);
    const table = this.OrderService.getTables();
    table.subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response['data'])
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.lengthDataSource = response['data']['count']
        this.progressBar = false
      })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selectionClear() :
      this.dataSource.data.forEach(row => {
        this.idArray.push(row.id)
        this.selection.select(row)
      }
      );
  }
  selectionClear() {
    this.selection.clear()
    this.idArray = []

  }
  // clearStartDate(event) {
  //   event.stopPropagation();
  //   this.date = null;
  //   this.datePicker = null;
  //   this.dataSource.filter = null;
  //   this.displayNoRecords = false;
  //   this.getTableData();
  //   // this.startDate = null;
  // }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.datePicker = moment(event.value).format('YYYY-MM-DD');
  //   this.filterValue = this.datePicker;
  //   console.log("this.filterValue", this.filterValue)
  //   // this.dataSource.filter = this.filterValue

  //   this.hardwareService.getFilterByDate(this.filterValue).subscribe((response: any) => {
  //     this.dataSource = new MatTableDataSource(response.data['table_data'])
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.lengthDataSource = response.data['count']
  //     this.progressBar = false
  //   })
  //   // if (this.dataSource.filteredData.length == 0) {
  //   //   this.displayNoRecords = true;
  //   // } else {
  //   //   this.displayNoRecords = false;

  //   // }
  // }
  valuesChecked(event, id) {
    if (event) {
      this.idArray.push(id)
    } else {
      for (var i = 0; i < this.idArray.length; i++) {
        if (id == this.idArray[i]) {
          this.idArray.splice(i, 1)
        }
      }
    }
  }
  generateCode() {
    if (this.idArray.length == 0) {
      // SwalAlert.warningAlert('Warning', 'No values are selected')
      console.log("No data")
    } else {
      this.generatePDF()
    }
    // this.hardwareService.sendingIdstoGenerateQr(this.idArray).subscribe((res: any) => {
    //   const data = res;
    //   let blob = null
    //   blob = new Blob([data], { type: 'application/pdf' });

    //   const url = window.URL.createObjectURL(blob)
    //   var fileLink = document.createElement('a');
    //   fileLink.href = url
    //   fileLink.download = 'QR_CODE'
    //   fileLink.click();
    // })
  }
  generatePDF(index = 0, document = new jsPDF(), colPos = 0, rowPos = 0) {
    let length_of_array = this.idArray.length
    const barcodeData = QrcodegenerateComponent.getBarcodeData(this.idArray[index]);

    const x = ((this.pageWidth / this.columnsPerPage) / 2) - (this.cellWidth / 2) + (colPos * (this.pageWidth / this.columnsPerPage));
    const y = this.borderTopBottom + (rowPos * this.cellHeight) + 1;
    document.addImage(barcodeData, "JPG", x, y, this.cellWidth - 2, this.cellHeight - 2);
    colPos++;
    if (colPos >= this.columnsPerPage) {
      colPos = 0;
      rowPos++;
    }
    if (rowPos >= this.rowsPerPage && index) {
      rowPos = 0;
      colPos = 0;
      document.addPage();
    }

    if (index > length_of_array - 2) {
      document.save(`QR-Codes.pdf`);
    } else {
      requestAnimationFrame(() => this.generatePDF(index + 1, document, colPos, rowPos));
    }
  }

  // openEditModal(content, data) {
  //   console.log("data= = = ", data)
  //   this.usecase = null;
  //   this.package_id = data?.package.id
  //   this.device_ID = data?.device_type[0];
  //   this.modalRef = this.modalService.show(content, { backdrop: 'static', class: 'modal-lg' });
  //   this.editForm.controls['id'].setValue(data?.id)
  //   this.editForm.controls['imei'].setValue(data?.imei);
  //   this.editForm.controls['sku_code'].setValue(data?.sku_code);
  //   this.editForm.controls['sim_serial_number'].setValue(data?.sim_serial_number);
  //   this.editForm.controls['sim_msisdn'].setValue(data?.sim_msisdn);
  //   if (data?.number_of_sim == "Dual Sim") {
  //     this.editForm.controls['number_of_sim'].setValue(2);
  //   } else {
  //     this.editForm.controls['number_of_sim'].setValue(1);
  //   }
  //   if (data?.type_of_sim == "Macro") {
  //     this.editForm.controls['type_of_sim'].setValue(2);
  //   } else {
  //     this.editForm.controls['type_of_sim'].setValue(1);
  //   }
  //   this.editForm.controls['sku_category'].setValue(data?.sku_category);
  //   this.editForm.controls['item_description'].setValue(data?.item_description);
  //   this.editForm.controls['make'].setValue(data?.make);
  //   this.editForm.controls['model'].setValue(data?.model);
  //   this.editForm.controls['supplier'].setValue(data?.supplier);
  //   this.editForm.controls['hs_code'].setValue(data?.hs_code);
  //   this.editForm.controls['product_code'].setValue(data?.product_code);
  //   this.editForm.controls['current_cost_price'].setValue(data?.current_cost_price);
  //   if (data?.manufacturing_date) {
  //     var sss = new Date(data?.manufacturing_date)
  //     this.editForm.controls['manufacturing_date'].setValue(sss);
  //     this.manufacturing_date = sss
  //   } else {
  //     this.editForm.controls['manufacturing_date'].setValue(data?.manufacturing_date);
  //   }

  //   this.usecase = data?.usecase[0];

  //   this.editForm.controls['additional_information'].setValue(data?.additional_information);
  //   this.editForm.controls['usecase'].setValue(data?.usecase[0]);
  //   this.editForm.controls['package'].setValue(data?.package?.name);

  //   //Call devices by package
  //   // this.hardwareService.getDeviceTypesByID(data?.package?.id).subscribe((res: ApiResponse) => {
  //   //   this.deviceTypeList = res.data
  //   // })


  //   this.editForm.controls['device_type'].setValue(data?.device_type[1]);
  //   this.editForm.controls['status'].setValue(data?.status);
  //   this.statusId = data?.status
  // }

  // onpackagechange(event, type = 1) {
  //   let key = 'useCase';
  //   if (type == 2) {
  //     key = 'usecase';
  //   }

  //   if (event == 5) {
  //     this.package_id = 5;
  //     if (type === 1) {
  //       this.editForm.get(key).setValue(1);
  //     } else {
  //       this.editForm.get(key).setValue(1);
  //     }
  //   }

  //   this.usecase = 1
  //   if (event == 6) {
  //     this.package_id = 6;
  //     this.editForm.get(key).setValue(1);
  //     this.usecase = 1
  //   }
  //   if (event == 8) {
  //     this.package_id = 8;
  //     this.editForm.get(key).setValue(2);
  //     this.usecase = 2
  //   }
  //   if (event == 9) {
  //     this.package_id = 9;
  //     this.editForm.get(key).setValue(2);
  //     this.usecase = 2
  //   }
  //   if (event == 10) {
  //     this.package_id = 10;
  //     this.editForm.get(key).setValue(2);
  //     this.usecase = 2
  //   }
  //   if (event == 11) {
  //     this.package_id = 11;
  //     this.editForm.get(key).setValue(2);
  //     this.usecase = 2
  //   }
  // }

  // modal_dismiss() {
  //   this.submitted = false;
  // }


  // returndob(event) {
  //   this.manufacturing_date = event;
  //   this.editForm.get('manufacturing_date').setValue(this.manufacturing_date);
  // }

  // onDeviceChange(event) {
  //   // console.log("event= ", event)
  //   this.device_ID = event;
  // }

  // onSubmit(data) {
  //   this.submitted = true;
  //   data['usecase'] = this.usecase;
  //   data['package'] = this.package_id
  //   const invalid = [];
  //   const controls = this.editForm.controls;
  //   for (const name in controls) {
  //     if (controls[name].invalid) {
  //       invalid.push(name);
  //     }
  //   }


  //   if (this.editForm.invalid) {
  //     console.log(invalid)
  //     return;
  //   } else {
  //     if (data['manufacturing_date']) {
  //       const dob = DateUtils.getYYYYMMDD(data['manufacturing_date']);
  //       data['manufacturing_date'] = dob;

  //     } else {

  //     }
  //     data['added_by'] = this.loggen_in_user['id'];
  //     data['device_type'] = this.device_ID;
  //     // console.log("data= ", data)
  //     this.hardwareService.updatedetails(data).subscribe((response: ApiResponse) => {
  //       if (!response.error) {
  //         this.toastr.success(response['data']['message'], '', {
  //           progressBar: true,
  //           progressAnimation: "decreasing",
  //           timeOut: 3000,
  //         })
  //         this.modalRef.hide();
  //         // this.getInventoryList();
  //         this.getTableData();

  //         if (data['status'] === 'Available') {
  //           this.onDeallocate(data);
  //         }

  //       } else {
  //         this.toastr.error(response['data']['message'], '', {
  //           progressBar: true,
  //           progressAnimation: "decreasing",
  //           timeOut: 3000,
  //         })
  //         this.modalRef.hide();
  //       }
  //     });
  //   }
  // }

  /* Recall api while paginating */
  // onPageChange(ev) {
  //   this.progressBar = true;
  //   this.hardwareService.getTableDataService(ev.offset, ev.pageSize, null, '').subscribe(
  //     (response: ApiResponse) => {
  //       this.dataSource = new MatTableDataSource(response.data['table_data']);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.lengthDataSource = response.data['count'];
  //       this.progressBar = false;
  //     });
  // }


  // onDeallocate(ev) {
  //   const formData = new FormData();
  //   formData.append('device_id', ev.imei);
  //   formData.append('device_association_status_id', 'Available');
  //   // const data = { device_id: ev.imei, device_association_status_id: 'Available' };
  //   this.customerSevice.deAllocateDevices(formData).subscribe((resp: ApiResponse) => {
  //   });
  //   let params = {device_id: ev.imei}
  //   this.customerSevice.deleteDevicesAdvanceExpire(ev.imei, params).subscribe((resp: ApiResponse) => { 
  //     this.customerSevice.deleteDevicesExpire(ev.imei, params).subscribe((resp: ApiResponse) => { 
  //       this.customerSevice.deleteDevicesAdvance(ev.imei).subscribe((resp: ApiResponse) => {
  //         this.customerSevice.deleteDevices(ev.imei).subscribe((resp: ApiResponse) => {
  //         });
  //       });
  //     });
  //   });
  // }


}
