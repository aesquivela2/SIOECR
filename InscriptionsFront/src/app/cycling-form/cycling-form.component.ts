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
  @Input() sportName: string = 'Ciclismo';

  maxSelectionError: boolean = false;

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
  parentData = {
    nivel: '',
    selectedOptions: [],  
    lateralidad: '',
    disability: '',
    disabilityProof: null
  }

}
