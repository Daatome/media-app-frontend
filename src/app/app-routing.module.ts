import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { ExamComponent } from './pages/exam/exam.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'pages',
    component:LayoutComponent,
    loadChildren: ()=> import('./pages/pages.routes').then((x)=> x.PagesRoutes)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
