import { switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import {Patient} from 'src/app/model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient',
  standalone:true,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  imports:[MaterialModule,RouterOutlet, RouterLink]
})
export class PatientComponent implements OnInit {

  dataSource: MatTableDataSource<Patient>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni','actions'];
  //dependency injection
  constructor(
    private patientService : PatientService,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.patientService.findAll().subscribe(data=>{
      console.log(data);
      this.dataSource= new MatTableDataSource(data);

    });

    this.patientService.getPatientChange().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
    })

    this.patientService.getMessageChange().subscribe(data=> this._snackBar.open(data, "Thanks",{duration:3000}));
  }

  delete(id:number){
    this.patientService.delete(id).pipe(switchMap(()=>this.patientService.findAll()))
    .subscribe(data=>{
      this.patientService.setPatientChange(data);
      this.patientService.setMessageChange("Deleted :)");
    })

  }


}
