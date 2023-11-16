import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';

@Component({
  selector: 'app-exam',
  standalone:true,
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
  imports:[MaterialModule]
})
export class ExamComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nameExam', 'descriptionExam','actions'];
  dataSource : MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
      private examService : ExamService,
      private dialog: MatDialog,
      private _snackBar: MatSnackBar

    ){}

  ngOnInit(): void {
    this.examService.findAll().subscribe((data)=>{
      this.createTable(data);

    });

    this.examService.getExamChange().subscribe(data=>{
      this.createTable(data);

    })

    this.examService.getMessageChange().subscribe(data=> this._snackBar.open(data, "Thanks",{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition: 'top'
    }));
  }

  createTable(data: Exam[]){
    this.dataSource= new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;

  }



  applyFilter(e: any){
    this.dataSource.filter= e.target.value.trim();
  }

  openDialog(exam? : Exam): void {
    this.dialog.open(ExamDialogComponent,
      {
        width:'350px',
        data: exam,
        disableClose:true
      });
  }

  delete(id: number){
    this.examService.delete(id).pipe(switchMap(()=>this.examService.findAll()))
    .subscribe((data)=>{
      this.examService.setExamChange(data);
      this.examService.setMessageChange("DELETED");
    });
  }
}
