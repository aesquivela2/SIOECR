import {Component, Input, ViewChild} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-swimming-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './swimming-form.component.html',
  styleUrls: ['./swimming-form.component.css']
})
export class SwimmingFormComponent {

  @ViewChild('athleteForm') athleteForm!: NgForm;
  @Input() swimmingData: any = {};

  constructor(private cdr: ChangeDetectorRef) {}

  // Athlete data model


  // Boolean for whether the user selected "Yes" or "No"
  isSwimmer: boolean = false;

  // Categories and their respective options
  categories = [
    { id: '1', name: 'Categoría 1', options: ['25mts libre', '25mts dorso', '25mts pecho', '25mts mariposa'] },
    { id: '2', name: 'Categoría 2', options: ['50mts libre', '50mts dorso', '50mts pecho'] },
    { id: '3', name: 'Categoría 3', options: ['100mts libre', '100mts dorso', '100mts pecho', '100mts mariposa', '100mts combinado'] },
    { id: '4', name: 'Categoría 4', options: ['200mts libre', '200mts dorso', '200mts pecho', '200mts mariposa', '400mts libre'] },
    { id: '5', name: 'Categoría 5', options: ['800mts libre', '1500mts libre', '1500mts abiertas', '1500mts abiertas unificado'] }
  ];

  selectedCategory: string  = '';
  selectedCategoryOptions: string[] = [];
  minSelectionError: boolean = false;

  // Method to handle swimMeters selection
  onSwimMetersChange(value: string) {
    this.isSwimmer = value === 'yes';
    if (!this.isSwimmer) {
      this.swimmingData.categorySelections = {};  // Clear selections
    }
    this.cdr.detectChanges();  // Trigger UI update
  }

  // Handle category selection
  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      this.selectedCategoryOptions = category.options;
    }
    this.cdr.detectChanges();
  }

  // Handle selection of category options
  onCategoryOptionSelect(option: string) {
    const categoryId = this.selectedCategory;

    if (!categoryId) return;

    if (!this.swimmingData.categorySelections[categoryId]) {
      this.swimmingData.categorySelections[categoryId] = [];
    }

    const index = this.swimmingData.categorySelections[categoryId].indexOf(option);
    if (index === -1) {
      this.swimmingData.categorySelections[categoryId].push(option);
    } else {
      this.swimmingData.categorySelections[categoryId].splice(index, 1);
    }

    this.checkMinSelection(categoryId);
  }

  // Check if the minimum number of category options (2) are selected
  checkMinSelection(categoryId: string) {
    this.minSelectionError = this.swimmingData.categorySelections[categoryId]?.length < 2;
  }

  // Handle form submission with validation
  onSubmit() {
    if (this.minSelectionError) {
      console.log('Please select at least two options.');
    } else {
      console.log('Form submitted successfully', this.swimmingData);
    }
  }
}
