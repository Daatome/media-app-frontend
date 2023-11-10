import { switchMap } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';

@Component({
  selector: 'app-medic-dialog',
  standalone:true,
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css'],
  imports:[MaterialModule, FormsModule, NgIf]
})
export class MedicDialogComponent implements OnInit {

  medic : Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef : DialogRef,
    private medicService : MedicService
  ){}
  ngOnInit(): void {

    this.medic= {...this.data};
  }

  operate(){

    if(this.medic!=null && this.medic.idMedic >0){
      //update
      this.medicService.update(this.medic.idMedic,this.medic)
      .pipe(switchMap(()=>this.medicService.findAll()))
      .subscribe((data)=>{
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange("UPDATED");
      })

    }else{
      //insert
      this.medicService.save(this.medic)
      .pipe(switchMap(()=>this.medicService.findAll()))
      .subscribe((data)=>{
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange("CREATED");
      })
    }
    this.close();
  }
  close(){
    this._dialogRef.close();
  }
}
