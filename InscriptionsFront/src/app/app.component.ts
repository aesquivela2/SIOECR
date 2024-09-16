import { Component } from '@angular/core';
import { PersonFormComponent } from './person-form/person-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
  imports: [PersonFormComponent]  
})
export class AppComponent {
  title = 'inscriptions-front';
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

