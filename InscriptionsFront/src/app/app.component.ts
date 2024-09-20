import { Component } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule] 
})
export class AppComponent {
  title = 'inscriptions-front';
}

export interface Region {
  id: number;
  name: string;
}

export interface Sport {
  id: number;
  type: string;
}
