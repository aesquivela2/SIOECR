import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AthleteService } from './athlete.service';
import { RegionService } from '../person-form/region.service';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css']
})
export class AthleteFormComponent implements OnInit {
  @ViewChild('athleteForm') athleteForm!: NgForm;
  currentStep = 1;

  // Athlete data model
  athlete = {
    identification: '',
    name: '',
    birthdate: '',
    email: '',
    phone_number: '',
    nationality: '',
    region: null,
    sport: '',
    weight: null,
    height: null,
  };

  regions: any[] = [];
  minDate: string = '';
  maxDate: string = '';
  invalidDate = false;

  constructor(
    private athleteService: AthleteService,
    private regionService: RegionService
  ) {}

  ngOnInit() {
    this.loadRegions();
    // Initialize min and max date for birthdate validation
    const currentYear = new Date().getFullYear();
    this.minDate = '1950-01-01'; // Arbitrary early limit
    this.maxDate = `${currentYear}-12-31`; // Current year
  }

  // Validate birthdate falls between minDate and maxDate
  validateBirthdate() {
    const birthdate = new Date(this.athlete.birthdate);
    const minBirthdate = new Date(this.minDate);
    const maxBirthdate = new Date(this.maxDate);

    this.invalidDate = !(birthdate >= minBirthdate && birthdate <= maxBirthdate);
  }

  // Load regions for the region select box
  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      data => { this.regions = data; },
      error => { console.error('Error fetching regions:', error); }
    );
  }

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.athleteForm.form.valid) {
      this.athleteService.createAthlete(this.athlete).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.athleteForm.resetForm();  // Reset form after successful submission
        },
        error => {
          console.error('Error creating athlete:', error);
          alert('Ocurrió un error al enviar los datos.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
