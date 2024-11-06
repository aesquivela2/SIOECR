import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SportService } from '../services/sport.service';
import { FormService } from '../form/form.service';
import { Sport } from '../app.component';
import {FormComponent} from "../form/form.component";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {SwimmingFormComponent} from "../swimming-form/swimming-form.component";
import {PingPongFormComponent} from "../ping-pong-form/ping-pong-form.component";
import {AthleteService} from "./athlete.service";
import {CyclingFormComponent} from "../cycling-form/cycling-form.component";
import {AthletismFormComponent} from "../athletism-form/athletism-form.component";
import {Router} from "@angular/router";
import { LateralityService } from '../services/laterality.service';
import { DisabilityTypeService } from '../services/disability-type.service';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css'],
  imports: [
    FormComponent,
    FormsModule,
    NgForOf,
    NgIf,
    SwimmingFormComponent,
    PingPongFormComponent,
    NgOptimizedImage,
    CyclingFormComponent,
    AthletismFormComponent,
    NgClass
  ]
})

export class AthleteFormComponent implements OnInit {
  @ViewChild('sportComboBox', { static: false }) sportComboBox!: ElementRef;
  sports: Sport[] = [];
  lateralityOptions: any[] = [];
  disabilityTypes: any[] = [];
  registration = {
    laterality: null // Dato de lateralidad enlazado al formulario
  };
  selectedSport: Sport | null = null;
  selectedSportId: number | null = null;
  loading = false;
  athleteData: any = {
    sportInfo: {
      disability: '',
      sport: '',
      laterality: ''
    }
  };

  private errorMessage: string = '';

  constructor(
    private lateralityService: LateralityService,
    protected formService: FormService,
    private sportService: SportService,
    private cdRef: ChangeDetectorRef,
    private athleteService: AthleteService,
    private router: Router,
    private disabilityTypeService: DisabilityTypeService
  ) {}

  showMessage: boolean = false;
  success: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadSports();
    this.loadDisabilityTypes();
    this.loadLateralityOptions();

    const storedPersonalData = this.formService.getPersonalData();
    const storedAthleteData = this.formService.getAthleteData();

    // Rellenar datos personales y específicos de atleta
    if (storedPersonalData) {
      this.formService.setPersonalData(storedPersonalData);
    }
    if (storedAthleteData) {
      this.athleteData.sportInfo = storedAthleteData.sportInfo || {};
      this.athleteData.laterality = storedAthleteData.laterality || '';
      this.selectedSport = this.sports.find(sport => sport.id === storedAthleteData.sport?.id) || null;
      this.athleteData.sportInfo.disabilityProof = storedAthleteData.sportInfo?.disabilityProof || null;
    }
  }

  loadDisabilityTypes() {
    this.disabilityTypeService.getDisabilityTypes().subscribe(
      data => {
        this.disabilityTypes = data;
        console.log("discapacidades obtenidas"+ this.disabilityTypes);
      },
      error => {
        console.error('Error al cargar tipos de discapacidad:', error);
      }
    );
  }
  loadLateralityOptions() {
    this.lateralityService.getLateralityOptions().subscribe(
      (data) => {
        this.lateralityOptions = data;
        console.log('Lateralidades obtenidas:' + this.lateralityOptions);
      },
      (error) => {
        console.error('Error loading lateralities:', error);
      }
    );
  }

  checkAndFillComboBox() {
    if (this.sportComboBox && this.sportComboBox.nativeElement) {
      this.fillComboBox();
    } else {
      setTimeout(() => this.checkAndFillComboBox(), 1000);
    }
  }

  loadSports() {
    this.loading = true;
    this.sportService.getAllSports().subscribe(
      (response: any) => {
        console.log('Datos recibidos:', response);

        if (Array.isArray(response)) {
          this.sports = response;
        } else if (response && typeof response === 'object') {
          this.sports = [response];
        }
        this.loading = false;
        this.checkAndFillComboBox();
      },
      (error) => {
        console.error('Error fetching sports:', error);
        this.loading = false;
      }
    );
    console.log("Hay algo" + this.sports.values());
    console.log(this.sports.values())
  }

  fillComboBox() {
    const selectElement = this.sportComboBox.nativeElement as HTMLSelectElement;

    selectElement.innerHTML = '<option value="" disabled selected>Seleccione un deporte</option>';

    this.sports.forEach((item) => {
      const sport = item;

      if (sport && sport.id && sport.name) {
        const option = document.createElement('option');
        option.value = sport.id.toString();
        option.text = sport.name;
        selectElement.appendChild(option);
      } else {
        console.error('El objeto sport no tiene las propiedades adecuadas:', sport);
      }
    });
  }

  onSportChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sportId = selectElement.value;  // Obtener el valor seleccionado

    console.log("Elemento seleccionado: ", selectElement);
    console.log("ID del deporte seleccionado: ", sportId);

    const selectedId = parseInt(sportId, 10);  // Convertir string a número

    // Buscando el deporte en la lista
    this.selectedSport = this.sports.find(sport => sport.id === selectedId ) || null;
    this.formService.setAthleteData({ sport: this.selectedSport });
    console.log("Deporte encontrado: ", this.selectedSport);
  }

  previousStep() {
    this.formService.setAthleteData({
      sportInfo: this.athleteData.sportInfo,
      laterality: this.athleteData.laterality,
      sport: this.selectedSport
    });

    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

  onSubmit() {
    this.formService.setAthleteData(this.athleteData);
    const personalData = this.formService.getFormData();

    if (!personalData.identification || !personalData.name || !personalData.nationality) {
      console.log("Datos incompletos en el primer formulario:", personalData);
      this.success = false;
      this.showMessage = true;
      this.errorMessage = 'Por favor, completa los campos obligatorios del primer formulario.';
      return;
    }

    const athleteDataToSubmit = {
      ...personalData,
      sport: this.selectedSport ? this.selectedSport : null,
      laterality: this.athleteData.laterality || null,
      disability: this.athleteData.sportInfo.disability || null,
      disabilityProof: this.athleteData.sportInfo.disabilityProof || null
    };

    this.athleteService.createAthlete(athleteDataToSubmit, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Atleta creado exitosamente:', response);
        this.success = true;
        this.showMessage = true;
        this.errorMessage = '';
        localStorage.setItem('successMessage', 'El atleta fue registrado correctamente.');
        this.router.navigate(['/inicio']);
      },
      (error) => {
        if (error.status === 200) {
          console.log('El atleta fue guardado, pero hubo un error al parsear la respuesta.');
          this.success = true;
          this.showMessage = true;
          this.errorMessage = 'Atleta guardado correctamente, pero hubo un problema al procesar la respuesta.';
          localStorage.setItem('successMessage', 'El atleta fue registrado correctamente.');
          this.router.navigate(['/inicio']);
        } else {
          console.error('Error en el envío del formulario:', error);
          this.success = false;
          this.showMessage = true;
          this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente más tarde.';
        }
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.athleteData.sportInfo.disabilityProof = file;
      this.formService.setFormData({ disabilityProof: file });
      this.formService.setAthleteData({ disabilityProof: file });
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

  trackBySportId(index: number, sport: Sport): number {
    return sport.id;
  }
}
