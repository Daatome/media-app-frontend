import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam-dialog',
  standalone:true,
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css'],
  imports:[MaterialModule,FormsModule, NgIf]
})
export class ExamDialogComponent implements OnInit {

  exam : Exam;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Exam,
    private _dialogRef : DialogRef,
    private examService : ExamService
  ){}

  ngOnInit(): void {
    this.exam= {...this.data};
  }

  operate(){

    if(this.exam!=null && this.exam.idExam >0){
      //update
      this.examService.update(this.exam.idExam,this.exam)
      .pipe(switchMap(()=>this.examService.findAll()))
      .subscribe((data)=>{
        this.examService.setExamChange(data);
        this.examService.setMessageChange("UPDATED");
      })

    }else{
      //insert
      this.examService.save(this.exam)
      .pipe(switchMap(()=>this.examService.findAll()))
      .subscribe((data)=>{
        this.examService.setExamChange(data);
        this.examService.setMessageChange("CREATED");
      })
    }
    this.close();
  }
  close(){
    this._dialogRef.close();
  }

}
