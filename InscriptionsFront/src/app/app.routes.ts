import { Routes } from '@angular/router';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { AthleteFormComponent } from './athlete-form/athlete-form.component';

export const routes: Routes = [
  { path: 'volunteer-form', component: VolunteerFormComponent },
  { path: 'athlete-form', component: AthleteFormComponent },
  { path: '**', redirectTo: 'volunteer-form' }  // Redirigir a una ruta válida en caso de rutas no válidas
];
