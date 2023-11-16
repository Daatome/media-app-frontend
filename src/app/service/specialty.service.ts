import { Injectable } from '@angular/core';
import { Specialty } from '../model/specialty';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService  extends GenericService<Specialty>{


  patientChange: Subject<Specialty[]>= new Subject<Specialty[]>();
  messageChange: Subject<string>= new Subject<string>();

  constructor(protected override http: HttpClient){

    super(http, `${environment.HOST}/specialties`);

  }

  setSpecialtyChange(data: Specialty[]){
    this.patientChange.next(data);
  }
  getSpecialtyChange(){
    return this.patientChange.asObservable();
  }

  setMessageChange(message:string){
    this.messageChange.next(message);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
