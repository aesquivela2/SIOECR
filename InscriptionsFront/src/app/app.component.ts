import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router correctamente
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
  imports: [RouterModule]  // Aquí no necesitas importar el RouterModule, solo el Router
})
export class AppComponent {
  title = 'inscriptions-front';

  constructor(private router: Router) {}  // Asegúrate de que el Router esté bien importado

  // Método para navegar a la página correcta
  navigateTo(formType: string) {
    if (formType === 'volunteer') {
      this.router.navigate(['/volunteer-form']);  // Navegar a la ruta del formulario de voluntario
    } else if (formType === 'athlete') {
      this.router.navigate(['/athlete-form']);  // Navegar a la ruta del formulario de atleta
    }
  }
}

export interface Region {
  id: number;
  name: string;
  province: {
    id: number;
    name: string;
  };
  canton: {
    id: number;
    name: string;
  };
}

export interface Sport {
  id: number;
  name: string;
  type: string;
  difficulty: string;
  needsSpecialEquipment: boolean;
}

