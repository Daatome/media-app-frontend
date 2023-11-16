import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ConsultListExamDTOI } from '../model/consultListExamDTOI';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url: string = `${environment.HOST}/consults`;

  constructor(private http: HttpClient) { }

  saveTransactional(dto: ConsultListExamDTOI){
    return this.http.post(this.url, dto);
  }
}
