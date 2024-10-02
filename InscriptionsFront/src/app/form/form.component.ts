import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProvinceService } from '../services/province.service';
import { RegionService } from '../services/region.service';
import { CantonService } from '../services/canton.service';  // Corrected path
import { FormService } from './form.service';
import axios from 'axios';
import * as url from "node:url";


// Interfaces for province, canton, and region
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
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('registrationForm') registrationForm!: NgForm;
  currentStep = 1;

  // Form model with initial values
  registration = {
    identification: '',
    name: '',
    birthdate: '' as string | Date,
    canton: null as Canton | null | undefined,
    citizenship: undefined as string | undefined,
    email: '',
    idType: 'cedula',
    identification: '',
    name: '',
    nationality: '',
    phone_number: '',
    province: null as Province | null | undefined,
    region: null as Region | null | undefined,
    worldRegion: null as string | null | undefined, // Added worldRegion
    country: undefined as string | null | undefined,
    district: undefined
  };
  //Informacion de Fecha

  minDate: string = '';
  maxDate: string = '';
  invalidDate: boolean = false; // Added declaration for invalidDate

  // Data to be populated from services
  cantons: Canton[] = [];
  regions: Region[] = [];
  provinces: Province[] = [];
  latinAmericanCountries: string[] = []; // Added latinAmericanCountries array
  districts: any[] = []; // Add districts array definition

  // World regions and countries
  worldRegions: { [key: string]: string[] } = {
    "North America": ["United States", "Canada", "Mexico"],
    "Latin America": [
      "Costa Rica", "Argentina", "Brazil", "Mexico", "Chile", "Colombia",
      "Ecuador", "Peru", "Venezuela", "Uruguay", "Paraguay", "Bolivia",
      "Panama", "Cuba", "Dominican Republic", "El Salvador", "Guatemala",
      "Honduras", "Nicaragua"
    ],
    "Europe": [
      "United Kingdom", "Germany", "France", "Italy", "Spain", "Portugal",
      "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden",
      "Norway", "Denmark", "Finland"
    ],
    "Asia": ["China", "Japan", "South Korea", "India", "Thailand", "Vietnam", "Philippines", "Malaysia", "Indonesia", "Singapore"],
    "Africa": ["Nigeria", "South Africa", "Kenya", "Egypt", "Morocco", "Ghana", "Ethiopia", "Tanzania", "Uganda", "Algeria"],
    "Oceania": ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Samoa", "Tonga", "Vanuatu"],
    "Middle East": ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Jordan", "Lebanon", "Israel", "Turkey"]
  };


  constructor(
    private router: Router,
    private formService: FormService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private cantonService: CantonService,
    private const url = `https://servicioselectorales.tse.go.cr/chc/resultado_persona.aspx`

  ) {}

  ngOnInit() {
    this.setDateConstraints();
    this.loadProvinces();
    this.loadCantons();
    this.loadRegions();
    this.loadLatinAmericanCountries();

    // Si ya tienes un valor de identificación, aplícale el formato correcto
    if (this.registration.identification) {
      this.updateIdentification(this.registration.identification);
    }
  }


  // Setting the minimum and maximum birthdate range
  setDateConstraints() {
    const today = new Date();
    const minYear = today.getFullYear() - 70;
    const maxYear = today.getFullYear() - 18;

    this.minDate = `${minYear}-01-01`;
    this.maxDate = `${maxYear}-12-31`;
  }

  // Load Latin American countries from the worldRegions object
  loadLatinAmericanCountries() {
    this.latinAmericanCountries = this.worldRegions['Latin America'];
  }

  // Validate if the birthdate is within the allowed range
  validateBirthdate() {
    const birthdate = new Date(this.registration.birthdate);
    const minBirthdate = new Date(this.minDate);
    const maxBirthdate = new Date(this.maxDate);

    this.invalidDate = !(birthdate >= minBirthdate && birthdate <= maxBirthdate);
  }

  // Load provinces from the service
  loadProvinces() {
    this.provinceService.getAllProvinces().subscribe(
      data => { this.provinces = data; },
      error => { console.error('Error fetching provinces:', error); }
    );
  }

  // Load cantons from the service
  loadCantons() {
    this.cantonService.getAllCantons().subscribe(
      data => { this.cantons = data; },
      error => { console.error('Error fetching cantons:', error); }
    );
  }

  // Load regions from the service
  private loadRegions() {
    this.regionService.getAllRegions().subscribe(
      data => { this.regions = data; },
      error => { console.error('Error fetching regions:', error); }
    );
  }

  // Move to the next step in the form process
  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  // Handle form submission
  onSubmit() {
    // Validate raw identification first
    const validationMessage = this.validateIdentification();

    if (validationMessage) {
      alert(validationMessage);
      return; // Stop the form submission
    }

    // If valid, apply the formatting
    this.applyIdentificationFormat();

    // Check the form validity and proceed
    if (this.registrationForm.form.valid) {
      this.formService.createAthlete(this.registration).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.registrationForm.resetForm();
        },
        error => {
          console.error('Error creating person:', error);
          alert('Ocurrió un error al enviar los datos.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }



  // Handle change in citizenship selection
  onCitizenshipChange() {
    if (this.registration.citizenship === 'nacional') {
      this.registration.region = null;
      this.registration.country = undefined; // Cambia '' a undefined para mantener consistencia
    }
  }

  // Handle change in region selection for Global regions
  onRegionChange() {
    if (this.registration.worldRegion) {
      // Actualiza la lista de países según la región global seleccionada
      this.latinAmericanCountries = this.worldRegions[this.registration.worldRegion] || [];
      this.registration.country = null; // Reiniciar la selección de país
    }
  }
  getIdentificationPattern() {
    switch (this.registration.idType) {
      case 'cedula':
        return '\\d{1}-\\d{4}-\\d{4}'; // Formato con guiones: 1-1853-0735
      case 'dimex':
        return '\\d{4}-\\d{6}-\\d{2}'; // Formato con guiones: 0123-456789-01
      case 'pasaporte':
        return '[A-Za-z0-9]{5,10}'; // Pasaportes no requieren guiones
      default:
        return '';
    }
  }


  validateIdentification() {
    // Eliminar los guiones o caracteres especiales antes de la validación
    const rawIdentification = this.registration.identification.replace(/-/g, ''); // Quita los guiones
    const pattern = new RegExp(this.getIdentificationPattern());

    if (!pattern.test(rawIdentification)) {
      return `Identificación inválida. Debe seguir el formato: ${this.getIdentificationPlaceholder()}`;
    }
    return '';
  }


  getIdentificationPlaceholder() {
    switch (this.registration.idType) {
      case 'cedula':
        return '1-XXXX-XXXX'; // Formato ejemplo para cédula
      case 'dimex':
        return 'XXXX-XXXXXX-XX'; // Formato ejemplo para DIMEX
      case 'pasaporte':
        return 'Alfanumérico (5-10 caracteres)'; // Formato ejemplo para pasaporte
      default:
        return '';
    }
  }

  applyIdentificationFormat() {
    const idType = this.registration.idType;
    let value = this.registration.identification.replace(/\D/g, ''); // Eliminate non-numeric characters

    // Apply the format depending on the type of identification
    if (idType === 'cedula' && value.length === 9) {
      // Format for 'cedula': 1-1853-0735
      this.registration.identification = `${value.slice(0, 1)}-${value.slice(1, 5)}-${value.slice(5, 9)}`;
    } else if (idType === 'dimex' && (value.length === 11 || value.length === 12)) {
      // Format for DIMEX: 0123-456789-01 or 0123-456789-012
      if (value.length === 11) {
        this.registration.identification = `${value.slice(0, 4)}-${value.slice(4, 10)}-${value.slice(10)}`;
      } else if (value.length === 12) {
        this.registration.identification = `${value.slice(0, 4)}-${value.slice(4, 10)}-${value.slice(10, 12)}`;
      }
    } else if (idType === 'pasaporte' && value.length >= 5 && value.length <= 10) {
      // Passports are simply transformed to uppercase (no specific format)
      this.registration.identification = value.toUpperCase();
    }
  }


  updateIdentification(value: string) {
    const idType = this.registration.idType;
    // Elimina cualquier formato antes de actualizar
    this.registration.identification = this.removeIdentificationFormat(value);

    // Aplica el formato correcto basado en el tipo de identificación
    this.applyIdentificationFormat();
  }

  private removeIdentificationFormat(value: string) {
    return "";
  }
  validatePhoneNumber() {
    const rawPhoneNumber = this.registration.phone_number.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    // Validación de longitud para números costarricenses
    if (rawPhoneNumber.length !== 8) {
      return 'El número de teléfono debe tener 8 dígitos.';
    }

    // Validación del prefijo costarricense (2, 6, 7, 8)
    const validPrefix = /^[2|6|7|8]/;
    if (!validPrefix.test(rawPhoneNumber)) {
      return 'El número de teléfono debe comenzar con 2, 6, 7 u 8.';
    }

    return ''; // Retorna vacío si no hay errores
  }



// Función para hacer la solicitud con el número de cédula
  private async function consultarCedula(cedula: string) {
    try {
      const data = new URLSearchParams();
      data.append('numero_cedula', cedula);  // Asumiendo que el parámetro es 'numero_cedula'

      const response = await axios.post(url, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      // Ver el HTML resultante
      const html = response.data;
      console.log(html);

      // Llamar a la función que extrae los datos
      const datosPersona = extraerDatosPersona(html);

      // Retornar los datos de la persona
      return datosPersona;

    } catch (error) {
      console.error('Error al consultar la cédula:', error);
      return null;
    }
  }

// Función para extraer el nombre completo y fecha de nacimiento del HTML
  function extraerDatosPersona(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const nombreCompleto = doc.querySelector('div:contains("Nombre Completo")')?.nextElementSibling?.textContent || '';
    const fechaNacimiento = doc.querySelector('div:contains("Fecha Nacimiento")')?.nextElementSibling?.textContent || '';
    return { nombreCompleto, fechaNacimiento };
  }}

