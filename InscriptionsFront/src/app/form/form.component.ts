import {ChangeDetectorRef, Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProvinceService } from '../services/province.service';
import { RegionService } from '../services/region.service';
import { CantonService } from '../services/canton.service';  // Corrected path
import { FormService } from './form.service';
import axios from 'axios';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {FormDataService} from "../services/form-data.service";

// Interfaces for province, canton, and region
interface Province {
  id: number;
  name: string;
}
interface Canton {
  id: number;
  name: string;
  provinceId: number;
}
interface Region {
  id: number;
  name: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmationDialogComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {

  @ViewChild('registrationForm', { static: false }) registrationForm!: NgForm;

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
    nationality: '',
    phone_number: '',
    province: null as Province | null | undefined,
    region: null as Region | null | undefined,
    worldRegion: null as string | null | undefined, // Added worldRegion
    country: undefined as string | null | undefined,
    district: undefined,
    lastname: ''
  };
  loading = false;
  showConfirmation = false;
  confirmationMessage = '';

  birthdateError: any;

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
  days: number[] = [];
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ];
  years: number[] = [];
  selectedDay: number | null = null;
  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  invalidDate: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: FormService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private cantonService: CantonService,
    private formDataService: FormDataService, // Inyectamos el servicio
    private fb: FormBuilder


  ) {}

  ngOnInit() {
    // Llenar los campos del formulario con los datos guardados en el servicio
    const formData = this.formService.getFormData();
    if (formData) {
      this.registration = {
        ...this.registration,
        ...formData // Combina los datos existentes con los guardados
      };
    }

    this.populateYears();
    this.populateDays();
    this.validateBirthdate();
    this.loadProvinces();
    this.loadCantons();
    this.loadRegions();
  }


  // Populate years for the range 18-70 years ago
  populateYears() {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 70;
    const maxYear = currentYear - 18;

    for (let i = maxYear; i >= minYear; i--) {
      this.years.push(i);
    }
  }

  // Populate days based on the selected month and year
  populateDays() {
    const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Days from 1 to daysInMonth
  }


  // Get the correct number of days in a month

  getDaysInMonth(month: number | null, year: number | null): number {
    if (!month || !year) {
      return 31; // Default to 31 if no month or year is selected
    }

    return new Date(year, month, 0).getDate();
  }




  validateBirthdate() {
    // Verificar si el usuario ha seleccionado todos los campos (día, mes, año)
    if (!this.selectedDay) {
      this.birthdateError = 'Por favor selecciona el día.';
      this.invalidDate = true;
    } else if (!this.selectedMonth) {
      this.birthdateError = 'Por favor selecciona el mes.';
      this.invalidDate = true;
    } else if (!this.selectedYear) {
      this.birthdateError = 'Por favor selecciona el año.';
      this.invalidDate = true;
    } else {
      // Si todos los campos están seleccionados, validar la fecha
      const selectedDate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);

      // Obtener la fecha actual y los límites de rango (18 y 70 años)
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 70, 0, 1);  // Hace 70 años
      const maxDate = new Date(currentDate.getFullYear() - 18, 11, 31); // Hace 18 años

      //  Comparar la fecha seleccionada con los límites permitidos
      if (selectedDate < minDate || selectedDate > maxDate) {
        this.birthdateError = `La fecha seleccionada está fuera del rango permitido (${minDate.getFullYear()} - ${maxDate.getFullYear()}).`;
        this.invalidDate = true;
      } else {
        this.birthdateError = ''; // Limpiar el error si la fecha es válida
        this.invalidDate = false;
      }
    }
  }

  onCitizenshipChange() {
    if (this.registration.citizenship === 'nacional') {
      this.registration.region = null;
      this.registration.country = "Costa Rica";
    }
  }




  getIdentificationPattern() {
    switch (this.registration.idType) {
      case 'física':
        return '\\d{1}-\\d{4}-\\d{4}';
      case 'dimex':
        return '\\d{4}-\\d{6}-\\d{2}';
      case 'pasaporte':
        return '[A-Za-z0-9]{5,10}';
      case 'juridica':
        return '\\d{1}-\\d{3}-\\d{6}';
      default:
        return '';
    }
  }

  validateIdentification() {
    const rawIdentification = this.registration.identification.replace(/-/g, '');
    const pattern = new RegExp(this.getIdentificationPattern());

    if (!pattern.test(rawIdentification)) {
      return `Identificación inválida. Debe seguir el formato: ${this.getIdentificationPlaceholder()}`;
    }
    return '';
  }

  getIdentificationPlaceholder() {
    switch (this.registration.idType) {
      case 'física':
        return '1-XXXX-XXXX';
      case 'juridica':
        return 'X-XXX-XXXXXX';
      case 'dimex':
        return 'XXXX-XXXXXX-XX';
      case 'pasaporte':
        return 'Alfanumérico (5-10 caracteres)';
      default:
        return '';
    }
  }


  updateIdentification(value: string) {
    this.registration.identification = this.removeIdentificationFormat(value);
    this.applyIdentificationFormat();
  }

  private removeIdentificationFormat(value: string) {
    return value.replace(/\D/g, '');
  }

  validatePhoneNumber() {
    const rawPhoneNumber = this.registration.phone_number.replace(/\D/g, '');

    if (rawPhoneNumber.length !== 8) {
      return 'El número de teléfono debe tener 8 dígitos.';
    }

    const validPrefix = /^[2|6|7|8]/;
    if (!validPrefix.test(rawPhoneNumber)) {
      return 'El número de teléfono debe comenzar con 2, 6, 7 u 8.';
    }

    return '';
  }

  extraerDatosPersona(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the element that contains "Nombre Completo" text
    const nombreCompletoElement = Array.from(doc.querySelectorAll('div')).find(div =>
      div.textContent?.includes("Nombre Completo")
    );
    const nombreCompleto = nombreCompletoElement?.nextElementSibling?.textContent || '';

    // Find the element that contains "Fecha Nacimiento" text
    const fechaNacimientoElement = Array.from(doc.querySelectorAll('div')).find(div =>
      div.textContent?.includes("Fecha Nacimiento")
    );
    const fechaNacimiento = fechaNacimientoElement?.nextElementSibling?.textContent || '';

    return { nombreCompleto, fechaNacimiento };
  }

  searchByCedula() {
    if (this.registration.identification) {
      const cedula = this.registration.identification.replace(/-/g, '');
      const tipoCedula = this.registration.idType;
      this.loading = true; // Set loading to true

      this.formService.searchByCedula(cedula, tipoCedula).subscribe(
        response => {
          this.loading = false; // Stop loading

          if (response.results && response.results.length > 0) {
            const personData = response.results[0];

            // Fill form fields
            this.registration.name = `${personData.firstname1} ${personData.firstname2}`.trim();
            this.registration.lastname = `${personData.lastname1} ${personData.lastname2}`.trim();



            // Show confirmation dialog
            this.confirmationMessage = `¿El nombre ${this.registration.name} corresponde a tu identificación?`;
            this.showConfirmation = true;

            this.cdr.detectChanges(); // Ensure Angular updates the form
          } else {
            console.error('No results found');
          }
        },
        error => {
          this.loading = false; // Stop loading on error
          console.error('Error fetching data:', error);
        }
      );
    }
  }


  // Handle confirmation
  onConfirmation(confirmed: boolean) {
    this.showConfirmation = false;  // Cierra el modal

    if (!confirmed) {
      // Continúa con el flujo normal
      console.log('Name confirmed');
    } else {
      this.registration.name = '';
      this.registration.lastname = '';

    }
  }

  private loadCantonsByProvince(province: Province | null | undefined) {

  }
  applyPhoneNumberMask() {
    let value = this.registration.phone_number.replace(/\D/g, ''); // Remover caracteres no numéricos
    if (value.length >= 8) {
      this.registration.phone_number = `+506 ${value.slice(0, 4)}-${value.slice(4, 8)}`;
    }
  }
  private async verifyIdentification(id: string) {
    const user =  this.registration.identification;

    if (!user) {
      this.showErrorDialog("No se encontró a la persona en el sistema.");
      return;
    }

    const confirmed = await this.showConfirmationDialog(`¿Esta es tu identificación: ${id}?`);

    if (!confirmed) {
      this.showErrorDialog("Por favor verifica tu identificación.");
    } else {
      // Continúa con el flujo normal
    }
  }

  private showErrorDialog(message: string) {
    // Implementa tu lógica para mostrar un diálogo de error
    alert(message); // Ejemplo simple
  }

  private showConfirmationDialog(message: string): Promise<boolean> {
    // Implementa tu lógica para mostrar un diálogo de confirmación
    return new Promise((resolve) => {
      const confirmed = confirm(message); // Ejemplo simple
      resolve(confirmed);
    });
  }

  onIdentificationChange() {
    this.formDataService.setFormData({ identification: this.registration.identification });
  }

  onNameChange($event: any) {
    this.formService.setFormData({ name: this.registration.name });
  }

  onLastNameChange($event: any) {
    this.formService.setFormData({ lastname: this.registration.lastname });
  }


  onBirthdateChange($event: any) {
    this.formDataService.setFormData({ birthdate: this.registration.birthdate });
  }

  onEmailChange($event: any) {
    this.formDataService.setFormData({ email: this.registration.email });
  }

  onPhoneNumberChange($event: any) {
    this.formDataService.setFormData({ phone_number: this.registration.phone_number });
  }

  onNationalityChange($event: any) {
    this.formDataService.setFormData({ nationality: this.registration.nationality });
  }

  onProvinceChange(province: Province | null) {
    this.registration.province = province;
    this.filterCantonsByProvince(province ? province.id : null);
    this.registration.canton = null;
  }


  onRegionChange($event: any) {
    if (this.registration.worldRegion) {
      this.latinAmericanCountries = this.worldRegions[this.registration.worldRegion] || [];
      this.registration.country = null;

    }


  }

  loadProvinces() {
    this.formService.getProvinces().subscribe(
      data => {
        this.provinces = data;

        if (this.registration.province) {
          this.formService.setFormData({ province: this.registration.province });
        }
      },
      error => {
        console.error('Error al cargar las provincias:', error);
      }
    );
  }

  loadCantons() {
    this.formService.getCantons().subscribe(
      data => {
        this.cantons = data;

        if (this.registration.canton) {
          this.formService.setFormData({ canton: this.registration.canton });
        }
      },
      error => {
        console.error('Error al cargar los cantones:', error);
      }
    );
  }

  loadRegions() {
    this.formService.getRegions().subscribe(
      data => {
        this.regions = data;
      },
      error => {
        console.error('Error al cargar las regiones:', error);
      }
    );
  }


  collectFormData() {
    // Verifica si registrationForm está inicializado antes de continuar
    if (!this.registrationForm) {
      console.error('Formulario no inicializado');
      return;
    }

    // Valida si el formulario es válido
    if (this.registrationForm.valid) {
      // Envía todos los campos en una única llamada a setFormData
      this.formService.setFormData({
        identification: this.registration.identification,
        idType: this.registration.idType,
        name: this.registration.name,
        lastname: this.registration.lastname,
        birthdate: this.registration.birthdate,
        email: this.registration.email,
        phone_number: this.registration.phone_number,
        citizenship: this.registration.citizenship,
        province_id: this.registration.province,
        canton_id: this.registration.canton,
        region_id: this.registration.region,
        worldRegion: this.registration.worldRegion,
        country: this.registration.country
      });

      console.log("Información enviada:", this.registration);

      // Avanza al siguiente paso
      this.nextStep();
    } else {
      // Muestra un error si el formulario no es válido
      console.error('El formulario contiene errores o está incompleto');
    }
  }


  onDayChange($event: any) {
    this.selectedDay = $event;
    this.updateBirthdate();
  }

  onMonthChange($event: any) {
    this.selectedMonth = $event;
    this.updateBirthdate();
  }

  onYearChange($event: any) {
    this.selectedYear = $event;
    this.updateBirthdate();
  }
  onWorldRegionChange($event: any) {
    this.formDataService.setFormData({ worldRegion: this.registration.worldRegion });
  }
  updateBirthdate() {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      this.registration.birthdate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
      this.formService.setFormData({ birthdate: this.registration.birthdate });
      console.log("Fecha de nacimiento actualizada:", this.registration.birthdate);
    }
  }


  filterCantonsByProvince(provinceId: number | null) {
    if (provinceId === null || provinceId === undefined) {
      // Si no se ha seleccionado una provincia, vacía la lista de cantones
      this.cantons = [];
    } else {
      // Usar el servicio para obtener los cantones desde la API
      this.formService.getCantons().subscribe(
        (cantons: Canton[]) => {
          // Filtra los cantones por la provincia seleccionada
          this.cantons = cantons.filter(canton => canton.provinceId === provinceId);
        },
        error => {
          console.error('Error al cargar los cantones:', error);
        }
      );
    }
  }


  applyIdentificationFormat() {
    const idType = this.registration.idType;
    let value = this.registration.identification.replace(/\D/g, ''); // Remover todo lo que no sea dígito

    // Aplicar el formato de identificación según el tipo
    if (idType === 'física' && value.length > 0) {
      // Formato de cédula física: 1-XXXX-XXXX
      this.registration.identification = value
        .replace(/^(\d{1})(\d{0,4})(\d{0,4})$/, (_, g1, g2, g3) => {
          return `${g1}${g2 ? '-' + g2 : ''}${g3 ? '-' + g3 : ''}`;
        });
    } else if (idType === 'dimex' && value.length > 0) {
      // Formato DIMEX: XXXX-XXXXXX-XX
      this.registration.identification = value
        .replace(/^(\d{4})(\d{0,6})(\d{0,2})$/, (_, g1, g2, g3) => {
          return `${g1}${g2 ? '-' + g2 : ''}${g3 ? '-' + g3 : ''}`;
        });
    } else if (idType === 'juridica' && value.length > 0) {
      // Formato cédula jurídica: X-XXX-XXXXXX
      this.registration.identification = value
        .replace(/^(\d{1})(\d{0,3})(\d{0,6})$/, (_, g1, g2, g3) => {
          return `${g1}${g2 ? '-' + g2 : ''}${g3 ? '-' + g3 : ''}`;
        });
    } else if (idType === 'pasaporte') {
      // Para pasaporte, solo convertir a mayúsculas
      this.registration.identification = this.registration.identification.toUpperCase();
    }
  }
  onIdentificationInput(value: string) {
    this.registration.identification = value;
    this.applyIdentificationFormat(); // Aplicar la máscara mientras el usuario escribe
  }

  nextStep() {
    // Guardar la información actual en el servicio antes de cambiar de paso
    this.formService.setFormData({
      identification: this.registration.identification,
      idType: this.registration.idType,
      name: this.registration.name,
      lastname: this.registration.lastname,
      birthdate: this.registration.birthdate,
      email: this.registration.email,
      phone_number: this.registration.phone_number,
      citizenship: this.registration.citizenship,
      province: this.registration.province,
      canton: this.registration.canton,
      region: this.registration.region,
      worldRegion: this.registration.worldRegion,
      country: this.registration.country
    });

    // Avanzar al siguiente paso
    if (this.formService.currentStep < 3) {
      this.formService.currentStep++;
    }
  }

  previousStep() {
    // Guardar la información actual antes de retroceder
    this.formService.setFormData({
      identification: this.registration.identification,
      idType: this.registration.idType,
      name: this.registration.name,
      lastname: this.registration.lastname,
      birthdate: this.registration.birthdate,
      email: this.registration.email,
      phone_number: this.registration.phone_number,
      citizenship: this.registration.citizenship,
      province: this.registration.province,
      canton: this.registration.canton,
      region: this.registration.region,
      worldRegion: this.registration.worldRegion,
      country: this.registration.country
    });

    // Retroceder al paso anterior
    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

}
