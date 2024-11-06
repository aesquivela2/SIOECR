import { Component, Input, OnInit } from '@angular/core'; // Asegúrate de que `OnInit` esté importado
import { FormsModule, NgForm } from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import { CyclingService } from '../services/cycling.service';

@Component({
  selector: 'app-cycling-form',
  templateUrl: './cycling-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    CommonModule
  ],
  styleUrls: ['./cycling-form.component.css']
})
export class CyclingFormComponent implements OnInit { // Implementa OnInit en la clase
  @Input() cyclingData!: any;
  @Input() sportName: string = 'Ciclismo';

  levels: any[] = []; // Almacenará los niveles obtenidos de la base de datos
  events: any[] = []; // Almacenará los eventos obtenidos de la base de datos

  maxSelectionError: boolean = false;

  constructor(private cyclingService: CyclingService) {} // Inyecta el servicio CyclingService

  ngOnInit(): void { // Implementa el método ngOnInit
    // Llama al servicio para obtener los niveles desde la base de datos al cargar el componente
    this.cyclingService.getLevels().subscribe(data => this.levels = data);

    // Llama al servicio para obtener los eventos desde la base de datos al cargar el componente
    this.cyclingService.getEvents().subscribe(data => this.events = data);
  }

  onOptionSelect(option: string) {
    if (!this.cyclingData.selectedOptions) {
      this.cyclingData.selectedOptions = [];
    }

    const index = this.cyclingData.selectedOptions.indexOf(option);

    if (index === -1 && this.cyclingData.selectedOptions.length < 2) {
      this.cyclingData.selectedOptions.push(option);
    } else if (index !== -1) {
      this.cyclingData.selectedOptions.splice(index, 1);
    }

    this.checkMaxSelection();
  }

  isOptionSelected(option: string): boolean {
    return this.cyclingData?.selectedOptions?.includes(option) || false;
  }

  checkMaxSelection() {
    if (this.cyclingData?.selectedOptions) {
      this.maxSelectionError = this.cyclingData.selectedOptions.length > 2;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.cyclingData.disabilityProof = file;
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

  onSubmit(ciclismoForm: NgForm) {
    if (ciclismoForm.valid && !this.maxSelectionError) {
      console.log('Formulario Enviado', this.cyclingData);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}
