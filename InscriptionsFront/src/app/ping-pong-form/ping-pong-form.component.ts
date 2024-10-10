import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-ping-pong-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './ping-pong-form.component.html',
  styleUrl: './ping-pong-form.component.css'
})
export class PingPongFormComponent {
  PingPongForm: any;
  athlete: any;

  levels = ['Alto', 'Medio', 'Bajo'];

  disabilities = ['Discapacidad Visual', 'Discapacidad Auditiva', 'Discapacidad Física', 'Discapacidad Intelectual'];
  testTypes = ['Prueba dobles unificadas', 'Prueba dobles', 'Prueba solos'];

  athleteData = {
    level: '',
    testType: '',
    laterality: '',
    disability: '',
    disabilityProof: null
  };
  lateralities: any;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.athleteData.disabilityProof = file;
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

  onSubmit() {
    console.log('Datos del atleta registrados:', this.athleteData);
    // Aquí puedes agregar el servicio para enviar los datos al backend
  }
}
