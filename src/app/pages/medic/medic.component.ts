import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-medic',
  standalone:true,
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css'],
  imports:[MaterialModule]
})
export class MedicComponent {

}
