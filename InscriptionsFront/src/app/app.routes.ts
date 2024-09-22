import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { AthleteFormComponent } from './athlete-form/athlete-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'volunteer-form', component: VolunteerFormComponent },
  { path: 'athlete-form', component: AthleteFormComponent },
  { path: 'programas', loadComponent: () => import('./programas/programas.component').then(m => m.ProgramasComponent) },
  { path: 'calendario', loadComponent: () => import('./calendario/calendario.component').then(m => m.CalendarioComponent) },
  { path: 'noticias', loadComponent: () => import('./noticias/noticias.component').then(m => m.NoticiasComponent) },
  { path: 'soporte', loadComponent: () => import('./soporte/soporte.component').then(m => m.SoporteComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
