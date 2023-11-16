import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MedicService } from './../../service/medic.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { Medic } from 'src/app/model/medic';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medic',
  standalone:true,
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css'],
  imports:[MaterialModule]
})
export class MedicComponent implements OnInit {


  dataSource : MatTableDataSource<Medic>;
  displayedColumns: string[] = ['id', 'primaryName', 'surname', 'cmpMedic','actions'];

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;


  constructor(
    private medicService: MedicService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.medicService.findAll().subscribe((data)=>{
      this.createTable(data);

    });

    this.medicService.getMedicChange().subscribe(data=>{
      this.createTable(data);

    })

    this.medicService.getMessageChange().subscribe(data=> this._snackBar.open(data, "Thanks",{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition: 'top'
    }));

  }

  createTable(data: Medic[]){
    this.dataSource= new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;

  }
  applyFilter(e: any){
    this.dataSource.filter= e.target.value.trim();
  }

  openDialog(medic? : Medic): void {
    this.dialog.open(MedicDialogComponent,
      {
        width:'350px',
        data: medic,
        disableClose:true
      });
  }

  delete(id: number){
    this.medicService.delete(id).pipe(switchMap(()=>this.medicService.findAll()))
    .subscribe((data)=>{
      this.medicService.setMedicChange(data);
      this.medicService.setMessageChange("DELETED");
    });
  }
}
