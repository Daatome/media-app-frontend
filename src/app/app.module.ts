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

@NgModule({
  declarations: [
    AppComponent,
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
