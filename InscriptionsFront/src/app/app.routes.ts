import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { AthleteFormComponent } from './athlete-form/athlete-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'volunteer-form', component: VolunteerFormComponent },
  { path: 'athlete-form', component: AthleteFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
