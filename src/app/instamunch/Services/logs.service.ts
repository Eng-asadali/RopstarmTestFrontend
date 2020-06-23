import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor(private httpServices: HttpService) { }

  getStaff() {
    return this.httpServices.get('logs/kitchen_logs/list_logs/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  getQuestions(id) {
 
    return this.httpServices.get('logs/kitchen_logs/questionnaire/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  addlog(data) {
    return this.httpServices.post(data, 'logs/kitchen_logs/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));

  }

  addQuestion(data) {
    return this.httpServices.post(data, 'logs/kitchen_logs/questionnaire/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));

  }
  getLogById(id) {
    return this.httpServices.get('logs/kitchen_logs/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  editLog(data,id){
    return this.httpServices.patch(data,'logs/kitchen_logs/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  editQuestion(data,id){
    http://168.63.140.202:8001/instamunch//96/
    return this.httpServices.patch(data,'logs/kitchen_logs/questionnaire/question/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  getQuestionById(id) {
    return this.httpServices.get('logs/kitchen_logs/questionnaire/question/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }


  uploadStaffById(data, id) {
    return this.httpServices.patchFormData(data, 'user/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteLogsById(id) {
    return this.httpServices.delete('logs/kitchen_logs/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  deleteQuestionsById(id) {
    return this.httpServices.delete('logs/kitchen_logs/questionnaire/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteMultipeLog(ids: []){
    return this.httpServices.postWithoutStatus({kitchen_logs_ids:ids},'logs/kitchen_logs/delete/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [],httpError: err })));
  }
  deleteMultipeQuestions(ids: []){
    return this.httpServices.postWithoutStatus({kitchen_questionnaire_ids:ids},'logs/kitchen_logs/questionnaire/delete/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [],httpError: err })));
  }
}
