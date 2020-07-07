import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateUtils } from '../Shared/DateUtils';

@Injectable()
export class HttpService {
  loggen_in_user;
  partner_id;
  constructor(private http: HttpClient) {
    this.loggen_in_user = JSON.parse(localStorage.getItem('user'));
    this.partner_id = localStorage.getItem('partner_id');
    // this.loggen_in_user = {id:13};
  }

  get(url) {
    return this.http.get(url);
  }

  post(data, url) {
    data['created_by_id'] = this.loggen_in_user['id'];
    data['os'] = "web";
    data['status'] = "active";
    data['partner_id'] = this.partner_id;
    console.log(data);
    return this.http.post(url, data);
  }

  postWithoutStatus(data, url) {
    data['os'] = "web";
    data['status'] = "active";
    data['partner_id'] = this.partner_id;
    return this.http.post(url, data);
  }

  postFormData(data, url) {
    data['created_by_id'] = this.loggen_in_user['id'];
    data['os'] = "web";
    data['status'] = "active";
    data['partner_id'] = this.partner_id;
    var form_data = this.converToFormdata(data);
    // console.log(form_data);
    return this.http.post(url, form_data);
  }

  postFormDataWithoutActiveStatus(data, url) {
    data['created_by_id'] = this.loggen_in_user['id'];
    data['os'] = "web";
    data['partner_id'] = this.partner_id;
    // console.log(data);
    var form_data = this.converToFormdata(data);
    return this.http.post(url, form_data);
  }

  filter(data, url) {
    // console.log(data);
    data['partner_id'] = this.partner_id;
    return this.http.post(url, data);
  }

  patch(data, url) {
    data['modified_by_id'] = this.loggen_in_user['id'];
    data['modified_datetime'] = DateUtils.getUtcDateTimeStart(new Date().toISOString());
    data['created_by_id'] = this.loggen_in_user['id'];
    data['os'] = "web";
    data['status'] = "active";
    data['partner_id'] = this.partner_id;
    // console.log(data);
    return this.http.patch(url, data);
  }

  patchFormData(data, url) {
    data['modified_by_id'] = this.loggen_in_user['id'];
    data['modified_datetime'] = DateUtils.getUtcDateTimeStart(new Date().toISOString());
    data['created_by_id'] = this.loggen_in_user['id'];
    data['os'] = "web";
    data['status'] = "active";
    var form_data = this.converToFormdata(data);
    data['partner_id'] = this.partner_id;
    // console.log(form_data);
    return this.http.patch(url, form_data);
  }

  patchFormDataWithoutActiveStatus(data, url) {
    data['modified_by_id'] = this.loggen_in_user['id'];
    data['modified_datetime'] = DateUtils.getUtcDateTimeStart(new Date().toISOString());;
    data['os'] = "web";
    data['partner_id'] = this.partner_id;
    // console.log(data);
    var form_data = this.converToFormdata(data);
    return this.http.patch(url, form_data);
  }

  delete(url) {
    return this.http.delete(url);
  }

  converToFormdata(data) {
    var form_data = new FormData();
    for (var key in data) {
      // console.log(key,data[key]);
      form_data.append(key, data[key]);
    }
    return form_data;
  }




}
