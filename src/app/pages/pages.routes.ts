import { Routes } from "@angular/router";
import { ExamComponent } from "./exam/exam.component";
import { MedicComponent } from "./medic/medic.component";
import { PatientEditComponent } from "./patient/patient-edit/patient-edit.component";
import { PatientComponent } from "./patient/patient.component";
import { SpecialtyComponent } from "./specialty/specialty.component";
import { ConsultAutocompleteComponent } from "./consult-autocomplete/consult-autocomplete.component";

export const PagesRoutes: Routes = [
  {
    path: 'patient', component: PatientComponent,
    children:[
      {
        path: 'new', component: PatientEditComponent
      },
      {
        path: 'edit/:id', component: PatientEditComponent
      }
    ]
  },
  {path: 'medic', component: MedicComponent},
  {path: 'exam', component: ExamComponent},
  {path: 'specialty', component: SpecialtyComponent},
  {path: 'consult-autocomplete', component: ConsultAutocompleteComponent}
];
