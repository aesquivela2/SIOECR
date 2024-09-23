import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import router for navigation
import { ProvinceService } from '../services/province.service';
import {AthleteService} from "../athlete-form/athlete.service";
import {RegionService} from "../services/region.service";
import {CantonService} from "../services/canton.service";
import {SportService} from "../services/sport.service";
import {SportLevelService} from "../services/sport-level.service";

interface Province {
  id: number;
  name: string;
}
interface Canton {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  @ViewChild('registrationForm') registrationForm!: NgForm;
  currentStep = 1;

  registration = {
    identification: '',
    name: '',
    birthdate: '' as string | Date,
    email: '',
    phone_number: '',
    nationality: '',
    canton: null as Canton | null,
    province: null as Province | null,
    region: null as Region | null
  };
  cantons: Canton[] = []; // You may want to load these based on selected province
  regions: Region[] = []; // Load all regions

  provinces: Province[] = [];
  minDate: string = '';
  maxDate: string = '';
  invalidDate = false;

  constructor(
    private router: Router, // Inject the router for navigation
    private athleteService: AthleteService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private cantonService: CantonService,
    private sportService: SportService,
    private sportLevelService: SportLevelService // Nuevo servicio
  ) {}

  ngOnInit() {
    this.setDateConstraints();
    this.loadProvinces();
    this.loadCantons(); // Add logic to load cantons
    this.loadRegions(); // Add logic to load regions
  }

  setDateConstraints() {
    const today = new Date();
    const minYear = today.getFullYear() - 70;
    const maxYear = today.getFullYear() - 18;

    this.minDate = `${minYear}-01-01`;
    this.maxDate = `${maxYear}-12-31`;
  }

  validateBirthdate() {
    const birthdate = new Date(this.registration.birthdate);
    const minBirthdate = new Date(this.minDate);
    const maxBirthdate = new Date(this.maxDate);

    this.invalidDate = !(birthdate >= minBirthdate && birthdate <= maxBirthdate);
  }

  loadProvinces() {
    this.provinceService.getAllProvinces().subscribe(
      data => { this.provinces = data; },
      error => { console.error('Error fetching provinces:', error); }
    );
  }



  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }
  loadCantons() {
    this.cantonService.getAllCantons().subscribe(
      data => { this.cantons = data; },
      error => { console.error('Error fetching cantons:', error); }
    );
  }

  navigateTo(type: string) {
    // Pass selected information as a query parameter to the next page
    this.router.navigate([`/${type}-form`], { queryParams: { ...this.registration } });
  }

  onSubmit() {
    if (this.registrationForm.form.valid) {
      // Process form submission
      console.log('Form data:', this.registration);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      data => { this.regions = data; },
      error => { console.error('Error fetching regions:', error); }
    );
  }
}
