import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { Exam } from '../model/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam>{


  examChange: Subject<Exam[]>= new Subject<Exam[]>();
  messageChange: Subject<string>= new Subject<string>();

  constructor(protected override http: HttpClient){

    super(http, `${environment.HOST}/exams`);

  }

  setExamChange(data: Exam[]){
    this.examChange.next(data);
  }
  getExamChange(){
    return this.examChange.asObservable();
  }

  setMessageChange(message:string){
    this.messageChange.next(message);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
