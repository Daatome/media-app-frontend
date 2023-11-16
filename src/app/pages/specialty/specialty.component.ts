import { MatDialog } from '@angular/material/dialog';
import { Specialty } from './../../model/specialty';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs';
import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';

@Component({
  selector: 'app-specialty',
  standalone:true,
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css'],
  imports:[MaterialModule]

})
export class SpecialtyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nameSpecialty', 'descriptionSpecialty','actions'];
  dataSource : MatTableDataSource<Specialty>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
      private specialtyService : SpecialtyService,
      private dialog: MatDialog,
      private _snackBar: MatSnackBar

  ){}


  ngOnInit(): void {
    this.specialtyService.findAll().subscribe((data)=>{
      this.createTable(data);

    });

    this.specialtyService.getSpecialtyChange().subscribe(data=>{
      this.createTable(data);

    })

    this.specialtyService.getMessageChange().subscribe(data=> this._snackBar.open(data, "Thanks",{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition: 'top'
    }));
  }

  createTable(data: Specialty[]){
    this.dataSource= new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;

  }



  applyFilter(e: any){
    this.dataSource.filter= e.target.value.trim();
  }

  openDialog(specialty? : Specialty): void {
    this.dialog.open(SpecialtyDialogComponent,
      {
        width:'350px',
        data: specialty,
        disableClose:true
      });
  }

  delete(id: number){
    this.specialtyService.delete(id).pipe(switchMap(()=>this.specialtyService.findAll()))
    .subscribe((data)=>{
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange("DELETED");
    });
  }

}
