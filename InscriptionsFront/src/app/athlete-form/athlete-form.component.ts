import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormComponent } from '../form/form.component';
import { PingPongFormComponent } from '../ping-pong-form/ping-pong-form.component';
import { SwimmingFormComponent } from '../swimming-form/swimming-form.component';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  imports: [FormsModule, CommonModule, FormComponent, PingPongFormComponent, SwimmingFormComponent, NgOptimizedImage],
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css']
})
export class AthleteFormComponent implements OnInit {
  @ViewChild('athleteForm') athleteForm!: NgForm;
  currentStep = 1;

  sports = ['Natación', 'Ping Pong', 'Fútbol'];

  // Centralized JSON structure for form data
  athleteData: any = {
    personalInfo: {},
    sportInfo: {},
    additionalInfo: {}
  };

  selectedSportComponent: any = null;

  constructor() {}

  ngOnInit() {}

  // Handling sport change to display correct child form
  onSportChange(sport: string) {
    this.athleteData.sportInfo.sport = sport;
  }

  // Moving to the next step
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  // Moving to the previous step
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Handling submission
  onSubmit() {
    if (this.athleteForm.form.valid) {
      console.log('Athlete Data JSON:', JSON.stringify(this.athleteData));
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.athleteData.sportInfo.disabilityProof = file;
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

}
