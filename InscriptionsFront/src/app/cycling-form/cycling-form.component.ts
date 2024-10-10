import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-cycling-form',
  templateUrl: './cycling-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./cycling-form.component.css']
})
export class CyclingFormComponent {
  @Input() cyclingData!: any;

  maxSelectionError: boolean = false;

  // Handle the selection of up to two options
  onOptionSelect(option: string) {
    if (!this.cyclingData.selectedOptions) {
      this.cyclingData.selectedOptions = [];  // Initialize if not already initialized
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
    // Check if cyclingData and selectedOptions exist before accessing them
    return this.cyclingData?.selectedOptions?.includes(option) || false;
  }

  checkMaxSelection() {
    if (this.cyclingData?.selectedOptions) {
      this.maxSelectionError = this.cyclingData.selectedOptions.length > 2;
    }
  }

  // Handle file upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.cyclingData.disabilityProof = file;
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

  // Handle form submission
  onSubmit(ciclismoForm: NgForm) {
    if (ciclismoForm.valid && !this.maxSelectionError) {
      console.log('Formulario Enviado', this.cyclingData);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
  parentData = {
    nivel: '',
    selectedOptions: [],  // Initialize as an empty array
    lateralidad: '',
    disability: '',
    disabilityProof: null
  }

}