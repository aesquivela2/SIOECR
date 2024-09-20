import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VolunteerService } from './volunteer.service';
import { SportService } from './sport.service';
import { RegionService } from '../person-form/region.service';

interface AvailableDay {
  id: number;
  day_name: string;
}

@Component({
  selector: 'app-volunteer-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})

export class VolunteerFormComponent implements OnInit {
  
  @ViewChild('volunteerForm') volunteerForm!: NgForm;  
  currentStep = 1;
  
  volunteer = {
    identification: '',
    name: '',
    birthdate: '',
    email: '',
    phone_number: '',
    nationality: '',
    region: null,
    sportExperience: [] as any[], 
    availableDays: [] as { id: number, day_name: string, selected?: boolean }[], 
    availableTimes: {} as { [key: number]: string }
  };

  regions: any[] = [];
  sports: any[] = [];  
  minDate: string = '';
  maxDate: string = '';
  invalidDate = false;

  availableTimesList = [
    { hour: '08', minutes: '00' },
    { hour: '12', minutes: '00' },
    { hour: '16', minutes: '00' }
  ];

  constructor(
    private volunteerService: VolunteerService,
    private sportService: SportService,
    private regionService: RegionService
  ) {}

  ngOnInit() {
    this.setDateConstraints();
    this.loadAvailableDays();
    this.loadRegions();
    this.loadSports(); 
  }

  setDateConstraints() {
    const today = new Date();
    const minYear = today.getFullYear() - 70;
    const maxYear = today.getFullYear() - 18;

    this.minDate = `${minYear}-01-01`;
    this.maxDate = `${maxYear}-12-31`;
  }

  validateBirthdate() {
    const birthdate = new Date(this.volunteer.birthdate);
    const minBirthdate = new Date(this.minDate);
    const maxBirthdate = new Date(this.maxDate);

    this.invalidDate = !(birthdate >= minBirthdate && birthdate <= maxBirthdate);
  }


  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      data => { this.regions = data; },
      error => { console.error('Error fetching regions:', error); }
    );
  }

  loadSports() {
    this.sportService.getAllSports().subscribe(
      data => {
        this.sports = this.removeDuplicates(data, 'name'); 
      },
      error => { console.error('Error fetching sports:', error); }
    );
  }

  removeDuplicates(array: any[], key: string) {
    return array.filter((item, index, self) => 
      index === self.findIndex((t) => t[key] === item[key])
    );
  }
  
  onSportSelectionChange(event: any) {
    const selectedSport = event.target.value;
    
    if (event.target.checked) {
      this.volunteer.sportExperience.push(selectedSport); // Add selected sport
    } else {
      this.volunteer.sportExperience = this.volunteer.sportExperience.filter(sport => sport !== selectedSport); // Remove deselected sport
    }
  }

  loadAvailableDays() {
    this.volunteer.availableDays = [
      { id: 1, day_name: 'Lunes' },
      { id: 2, day_name: 'Martes' },
      { id: 3, day_name: 'Miércoles' },
      { id: 4, day_name: 'Jueves' },
      { id: 5, day_name: 'Viernes' },
      { id: 6, day_name: 'Sábado' },
      { id: 7, day_name: 'Domingo' }
    ];
  }

  getDayName(day: AvailableDay): string {
    return day.day_name;
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

  onSubmit() {
    if (this.volunteerForm.form.valid) {
      if (this.volunteer.birthdate) {
        this.volunteer.birthdate = new Date(this.volunteer.birthdate).toISOString();
      }

      this.volunteer.availableDays = this.volunteer.availableDays
        .filter(day => day.selected)
        .map(day => ({ id: day.id, day_name: day.day_name }));

      this.volunteerService.createVolunteer(this.volunteer).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.volunteerForm.resetForm();
        },
        error => {
          console.error('Error creando voluntario:', error);
          alert('Ocurrió un error al enviar los datos.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
