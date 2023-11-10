import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule,RouterLink, NgIf]
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  id : number;
  isEdit: boolean;

  //dependency injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ){  }

  ngOnInit(): void {
    this.form= new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl('',[Validators.minLength(3), Validators.required]),
      lastName: new FormControl('',[Validators.minLength(3), Validators.required]),
      dni: new FormControl('',[Validators.minLength(8),Validators.maxLength(8), Validators.required]),
      address: new FormControl('',[Validators.maxLength(150), Validators.required]),
      phone: new FormControl('',[Validators.maxLength(10), Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
    })
    this.route.params.subscribe(data=>{
      this.id= data['id'];//we defined the name in the router module
      this.isEdit= this.id!=null;
      this.initForm();
    })
  }



  initForm(){
    if(this.isEdit){
      this.patientService.findById(this.id).subscribe(data=>{
        this.form= new FormGroup({
          idPatient: new FormControl(data.idPatient),
          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          dni: new FormControl(data.dni),
          address: new FormControl(data.address),
          phone: new FormControl(data.phone),
          email: new FormControl(data.email),
        });
      });
    }
  }

  operate(){
    const patient :Patient= new Patient();
    patient.idPatient= this.form.value['idPatient'];
    patient.firstName= this.form.value['firstName'];
    patient.lastName= this.form.value['lastName'];
    patient.dni= this.form.value['dni'];
    patient.address= this.form.value['address'];
    patient.phone= this.form.value['phone'];
    patient.email= this.form.value['email'];
    if(this.isEdit){


      //not ideal
      this.patientService.update(this.id, patient).subscribe(()=>{
        this.patientService.findAll().subscribe(data=>{
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange("UPDATED")
        });
      });
    }else{
      //ideal
      this.patientService.save(patient)
      .pipe(switchMap(()=> this.patientService.findAll()))
      .subscribe(data=>{
        this.patientService.setPatientChange(data);
        this.patientService.setMessageChange("CREATED")

      });
    }
    this.router.navigate(['/pages/patient']);

  }

  get f(){
    return this.form.controls;

  }
}
