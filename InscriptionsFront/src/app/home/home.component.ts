import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',   // Path to the HTML file
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [


  ],
  // Path to the CSS file
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]); // Navigate to the desired route
  }
}
