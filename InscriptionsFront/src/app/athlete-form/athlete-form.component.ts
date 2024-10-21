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
  sports: Sport[] = []; // Lista de deportes
  selectedSport: Sport | null = null; // Deporte seleccionado
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

    this.loadSports();  // Load sports data on init
  }

  checkAndFillComboBox() {
    if (this.sportComboBox && this.sportComboBox.nativeElement) {
      this.fillComboBox();  // Llama a la función para llenar el combo box
    } else {
      // Si no está disponible, esperamos 100 ms y verificamos nuevamente
      setTimeout(() => this.checkAndFillComboBox(), 1000);
    }
  }

  loadSports() {
    this.loading = true;
    this.sportService.getAllSports().subscribe(
      (response: any) => {
        console.log('Datos recibidos:', response);  // Verifica la estructura del objeto

        if (Array.isArray(response)) {
          this.sports = response;
        } else if (response && typeof response === 'object') {
          this.sports = [response];  // Convertir response a array si es un objeto
        }

        this.loading = false;  // Los datos ya se han cargado

        // Intenta llenar el combo box una vez que el DOM esté listo
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

    // Limpiar las opciones existentes
    selectElement.innerHTML = '<option value="" disabled selected>Seleccione un deporte</option>';

    // Rellenar las opciones accediendo a la propiedad anidada 'sport'
    this.sports.forEach((item) => {
      const sport = item;  // Accede a la propiedad anidada 'sport'

      // Verifica que 'sport' tenga las propiedades 'id' y 'name' (u otra propiedad que desees usar)
      if (sport && sport.id && sport.name) {
        const option = document.createElement('option');
        option.value = sport.id.toString();
        option.text = sport.name;  // Accede a la propiedad 'name' dentro de 'sport'
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

    console.log("Deporte encontrado: ", this.selectedSport);
  }



  previousStep() {
    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

  onSubmit() {
    // Validación de los campos antes de enviar
    if (!this.athleteData.laterality || !this.athleteData.sportInfo) {
      this.success = false;
      this.showMessage = true;
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    // Setear los datos en el servicio del formulario
    this.formService.setFormData({
      laterality: this.athleteData.laterality,
      sport: this.athleteData.sportInfo
    });

    console.log(this.athleteData.sportInfo);

    // Forzar el tipo de respuesta como 'text'
    this.athleteService.createAthlete(this.formService.getFormData(), { responseType: 'text' }).subscribe(
      (response) => {
        // Si el envío es exitoso (aunque la respuesta sea texto), procesamos el éxito
        console.log('Respuesta del servidor:', response);
        this.success = true;
        this.showMessage = true;
        this.errorMessage = ''; // Limpia los mensajes de error

        // Guardar mensaje de éxito en localStorage
        localStorage.setItem('successMessage', 'El atleta fue registrado correctamente.');

        // Redirigir a la página de inicio
        this.router.navigate(['/inicio']);
      },
      (error) => {
        // Si ocurre un error, revisamos si tiene estado 200, pero con error de parsing
        if (error.status === 200) {
          console.log('El atleta fue guardado, pero hubo un error al parsear la respuesta.');
          this.success = true;
          this.showMessage = true;
          this.errorMessage = 'Atleta guardado correctamente, pero hubo un problema al procesar la respuesta.';

          // Guardar mensaje de éxito en localStorage
          localStorage.setItem('successMessage', 'El atleta fue registrado correctamente.');

          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']);
        } else {
          // Otros errores se manejan normalmente
          this.success = false;
          this.showMessage = true;
          this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente más tarde.';
        }

        console.error('Error en el envío del formulario:', error);
      }
    );
  }






  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.athleteData.sportInfo.disabilityProof = file;
    } else {
      alert('Por favor, suba  un archivo PDF válido.');
    }
  }
  trackBySportId(index: number, sport: Sport): number {
    console.log(sport.name);
    return sport.id;
  }
}
