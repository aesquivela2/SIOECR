import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AthleteService } from './athlete.service';
import { RegionService } from '../services/region.service';
import { ProvinceService } from '../services/province.service';  
import { CantonService } from '../services/canton.service';  
import { SportLevelService } from '../services/sport-level.service'; 
import { SportService } from '../services/sport.service';

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

  // Datos del atleta
  athlete = {
    identification: '',
    name: '',
    birthdate: '',
    email: '',
    phone_number: '',
    nationality: '',
    region: null,
    province: null,  
    canton: null,    
    sport: '',
    weight: null,
    height: null,
    sportLevel: null, // Nuevo campo
    laterality: '',   // Nuevo campo
    disabilityType: '' // Nuevo campo
  };

  regions: any[] = [];
  provinces: any[] = [];  
  cantons: any[] = [];   
  sports: any[] = []; 
  sportLevels: any[] = []; // Lista para niveles deportivos
  minDate: string = '';
  maxDate: string = '';
  invalidDate = false;

  constructor(
    private athleteService: AthleteService,
    private regionService: RegionService,
    private provinceService: ProvinceService,  
    private cantonService: CantonService,
    private sportService: SportService, 
    private sportLevelService: SportLevelService // Nuevo servicio
  ) {}

  ngOnInit() {
    this.loadRegions();
    this.loadProvinces();  
    this.loadCantons();    
    this.loadSportLevels(); // Cargar niveles deportivos
    this.loadSports();

    const currentYear = new Date().getFullYear();
    this.minDate = '1950-01-01'; 
    this.maxDate = `${currentYear}-12-31`; 
  }

  loadSports() {
    this.sportService.getAllSports().subscribe(
      data => {
        this.sports = data.filter((sport, index, self) =>
          index === self.findIndex(s => s.type === sport.type)
        );
      },
      error => {
        console.error('Error fetching sports:', error);
      }
    );
  }

  // Validar la fecha de nacimiento
  validateBirthdate() {
    const birthdate = new Date(this.athlete.birthdate);
    const minBirthdate = new Date(this.minDate);
    const maxBirthdate = new Date(this.maxDate);

    this.invalidDate = !(birthdate >= minBirthdate && birthdate <= maxBirthdate);
  }

  // Cargar las regiones
  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      data => { this.regions = data; },
      error => { console.error('Error fetching regions:', error); }
    );
  }

  // Cargar las provincias
  loadProvinces() {
    this.provinceService.getAllProvinces().subscribe(
      data => { this.provinces = data; },
      error => { console.error('Error fetching provinces:', error); }
    );
  }

  // Cargar los cantones
  loadCantons() {
    this.cantonService.getAllCantons().subscribe(
      data => { this.cantons = data; },
      error => { console.error('Error fetching cantons:', error); }
    );
  }

  // Cargar los niveles deportivos
  loadSportLevels() {
    this.sportLevelService.getAllSportLevelsDescriptions().subscribe(
      data => { this.sportLevels = data; },
      error => { console.error('Error fetching sport levels:', error); }
    );
  }

  // Avanzar al siguiente paso
  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  // Retroceder al paso anterior
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Enviar el formulario
  onSubmit() {
    if (this.athleteForm.form.valid) {
      this.athleteService.createAthlete(this.athlete).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.athleteForm.resetForm(); 
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
