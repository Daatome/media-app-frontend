import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import { ExamComponent } from './pages/exam/exam.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { ExamDialogComponent } from './pages/exam/exam-dialog/exam-dialog.component';
import { SpecialtyDialogComponent } from './pages/specialty/specialty-dialog/specialty-dialog.component';
import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    //ConsultAutocompleteComponent,
    //SpecialtyDialogComponent,
    //SpecialtyComponent,
    //ExamDialogComponent,
    //LayoutComponent,
    //LoginComponent,
    //ExamComponent,
    //MedicDialogComponent,
    //PatientEditComponent,
    //PatientComponent,
    //MedicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
