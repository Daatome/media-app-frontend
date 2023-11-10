import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import {Medic} from './../model/medic';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic> {


  patientChange: Subject<Medic[]>= new Subject<Medic[]>();
  messageChange: Subject<string>= new Subject<string>();

  constructor(protected override http: HttpClient){

    super(http, `${environment.HOST}/medics`);

  }

  setMedicChange(data: Medic[]){
    this.patientChange.next(data);
  }
  getMedicChange(){
    return this.patientChange.asObservable();
  }

  setMessageChange(message:string){
    this.messageChange.next(message);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
