import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(formType: string) {
    if (formType === 'volunteer') {
      this.router.navigate(['/volunteer-form']);
    } else if (formType === 'athlete') {
      this.router.navigate(['/athlete-form']);
    }
  }
}
