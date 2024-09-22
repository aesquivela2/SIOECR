import { Component, OnInit, ViewChild } from '@angular/core';  
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VolunteerService } from './volunteer.service';
import { SportService } from '../services/sport.service';
import { RegionService } from '../services/region.service';
import { ProvinceService } from '../services/province.service';
import { CantonService } from '../services/canton.service';
import { AvailableDaysService, AvailableDay } from '../services/days.service'; 
import { TimeService, Time } from '../services/time.service'; 

interface Province {
  id: number;
  name: string;
}

interface Canton {
  id: number;
  name: string;
  provinceId: number;
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
    birthdate: '' as string | Date,
    email: '',
    phone_number: '',
    nationality: '',
    region: null,
    province: null as Province | null, 
    canton: null as Canton | null,  
    sportExperience: [] as any[], 
    availableDays: [] as AvailableDay[], 
    availableTimes: {} as { [key: number]: Time[] }
  };

  regions: any[] = [];
  provinces: Province[] = [];  // Declare provinces as an array of Province objects
  cantons: Canton[] = [];      // Declare cantons as an array of Canton objects
  sports: any[] = [];
  times: Time[] = [];  
  minDate: string = '';
  maxDate: string = '';
  invalidDate = false;

  selectedDays: AvailableDay[] = [];

  constructor(
    private volunteerService: VolunteerService,
    private sportService: SportService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private cantonService: CantonService,
    private availableDaysService: AvailableDaysService,
    private timeService: TimeService  // Servicio para horas
  ) {}

  ngOnInit() {
    this.setDateConstraints();
    this.loadAvailableDays();
    this.loadRegions();
    this.loadProvinces();
    this.loadCantons();  // Load all cantons on initialization
    this.loadSports();
    this.loadTimes();  // Carga las horas disponibles
  }

  setDateConstraints() {
    const today = new Date();
    const minYear = today.getFullYear() - 70;
    const maxYear = today.getFullYear() - 18;
  
    this.minDate = `${minYear}-01-01`;  // Backticks for string interpolation
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

  loadProvinces() {
    this.provinceService.getAllProvinces().subscribe(
      data => { this.provinces = data; },
      error => { console.error('Error fetching provinces:', error); }
    );
  }

  loadCantons() {
    this.cantonService.getAllCantons().subscribe(
      (data: Canton[]) => {
        this.cantons = data;  // Assign data directly
        console.log('Cantons loaded:', this.cantons);  // Log to confirm data is loaded
      },
      error => {
        console.error('Error fetching cantons:', error);  // Log the error
      }
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

  loadAvailableDays() {
    this.availableDaysService.getAllAvailableDays().subscribe(
      data => {
        this.volunteer.availableDays = data;
        console.log('Available days:', this.volunteer.availableDays);  // Debugging line
      },
      error => {
        console.error('Error fetching available days:', error);
      }
    );
  }
  
  
  loadTimes() {
    this.timeService.getAllTimes().subscribe(
      data => { 
        this.times = data;  // Assign data to times array
        console.log('Times loaded:', this.times);
      },
      error => {
        console.error('Error fetching times:', error);  // Log the error
      }
    );
  }  

  removeDuplicates(array: any[], key: string) {
    return array.filter((item, index, self) =>
      index === self.findIndex((t) => t[key] === item[key])
    );
  }

  onSportSelectionChange(event: any) {
    const selectedSportId = event.target.value;
  
    if (event.target.checked) {
      this.volunteer.sportExperience.push({ sportId: selectedSportId });
    } else {
      this.volunteer.sportExperience = this.volunteer.sportExperience.filter(
        sport => sport.sportId !== selectedSportId
      );
    }
  }

  onDaySelectionChange(day: AvailableDay, event: any) {
    if (event.target.checked) {
      this.selectedDays.push(day);
      this.volunteer.availableTimes[day.id] = []; // Inicializa las horas para el día seleccionado
    } else {
      this.selectedDays = this.selectedDays.filter(d => d.id !== day.id);
      delete this.volunteer.availableTimes[day.id];
    }
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

  isFormComplete(): boolean {
    return !!this.volunteer.identification && !!this.volunteer.name && !!this.volunteer.birthdate && 
           !!this.volunteer.email && !!this.volunteer.phone_number && !!this.volunteer.nationality &&
           !!this.volunteer.region && !!this.volunteer.province && !!this.volunteer.canton;
  }
  
  onSubmit() {
    if (this.volunteerForm.form.valid && this.isFormComplete()) {
      // Convertir el birthdate a tipo Date antes de enviar
      const volunteerToSend = { ...this.volunteer };
      volunteerToSend.birthdate = new Date(this.volunteer.birthdate as string);
      
      console.log('Datos del voluntario enviados:', volunteerToSend);
      this.volunteerService.createVolunteer(volunteerToSend).subscribe(
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
