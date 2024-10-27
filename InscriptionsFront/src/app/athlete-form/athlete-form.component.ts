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
    protected formService: FormService,
    private sportService: SportService,
    private cdRef: ChangeDetectorRef,
    private athleteService: AthleteService,
    private router: Router

  ) {}

  showMessage: boolean = false;
  success: boolean = false;

  ngOnInit() {
    this.loadSports(); 
  
    const storedData = this.formService.getFormData();
    if (storedData.disabilityProof) {
      this.athleteData.sportInfo.disabilityProof = storedData.disabilityProof; 
    }
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

  onSportChange(selectedSport: Sport | null) {
    this.selectedSport = selectedSport;
  
    if (this.selectedSport) {
      this.athleteData.sportInfo.sport = this.selectedSport.name; 
      this.formService.setFormData({ sport: this.selectedSport.name, sportId: this.selectedSport.id });
    } else {
      this.athleteData.sportInfo.sport = null;
      this.formService.setFormData({ sport: null, sportId: null });
    }
  
    console.log('Deporte seleccionado:', this.selectedSport);
  }

  previousStep() {
    this.formService.setFormData({
      laterality: this.athleteData.laterality,
      sport: this.athleteData.sportInfo.sport,
      disabilityProof: this.athleteData.sportInfo.disabilityProof 
    });
  
    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }
  
  onSubmit() {
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
      sport: this.selectedSport ? this.selectedSport.name : null,   
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
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

  trackBySportId(index: number, sport: Sport): number {
    return sport.id;
  }
}
