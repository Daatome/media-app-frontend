import { Patient } from './../model/patient';
import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends GenericService<Patient> {

  //private url :string=`${environment.HOST}/patients`;

  patientChange: Subject<Patient[]>= new Subject<Patient[]>();
  messageChange: Subject<string>= new Subject<string>();

  constructor(protected override http: HttpClient){
    super(http, `${environment.HOST}/patients`);
  }

 // constructor( private http : HttpClient) { }
/*
  findAll(){

    return this.http.get<Patient[]>(this.url);
  }

  findById(id:number){
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient:Patient){
    return this.http.post(this.url,patient);
  }
  update(id:number,patient:Patient){
    return this.http.put(`${this.url}/${id}`,patient);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
*/
  setPatientChange(data: Patient[]){
    this.patientChange.next(data);
  }
  getPatientChange(){
    return this.patientChange.asObservable();
  }

  setMessageChange(message:string){
    this.messageChange.next(message);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }

}
