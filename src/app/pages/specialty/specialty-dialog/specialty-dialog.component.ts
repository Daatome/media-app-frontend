import { SpecialtyService } from 'src/app/service/specialty.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialty-dialog',
  standalone:true,
  templateUrl: './specialty-dialog.component.html',
  styleUrls: ['./specialty-dialog.component.css'],
  imports: [MaterialModule,FormsModule, NgIf]
})
export class SpecialtyDialogComponent implements OnInit {
  specialty : Specialty;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Specialty,
    private _dialogRef : DialogRef,
    private specialtyService : SpecialtyService
  ){}

  ngOnInit(): void {
    this.specialty= {...this.data};
  }

  operate(){

    if(this.specialty!=null && this.specialty.idSpecialty >0){
      //update
      this.specialtyService.update(this.specialty.idSpecialty,this.specialty)
      .pipe(switchMap(()=>this.specialtyService.findAll()))
      .subscribe((data)=>{
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange("UPDATED");
      })

    }else{
      //insert
      this.specialtyService.save(this.specialty)
      .pipe(switchMap(()=>this.specialtyService.findAll()))
      .subscribe((data)=>{
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange("CREATED");
      })
    }
    this.close();
  }
  close(){
    this._dialogRef.close();
  }
}
