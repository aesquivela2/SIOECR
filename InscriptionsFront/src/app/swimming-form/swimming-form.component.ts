import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { SwimmingService } from '../services/swimming.service';

@Component({
  selector: 'app-swimming-form',
  templateUrl: './swimming-form.component.html',
  styleUrls: ['./swimming-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Asegúrate de incluir FormsModule y CommonModule
})
export class SwimmingFormComponent implements OnInit {

  @ViewChild('athleteForm') athleteForm!: NgForm;
  @Input() swimmingData: any = {
    swimMeters: '',
    lateralidad: '',
    category: '',
    categorySelections: {}
  };
  @Input() sportName: string = 'Natación';

  isSwimmer: boolean = false;

  categories: any[] = [];
  selectedCategoryOptions: string[] = [];
  minSelectionError: boolean = false;
  selectedCategory: string = '';

  constructor(private cdr: ChangeDetectorRef, private swimmingService: SwimmingService) {}

  ngOnInit(): void {
    this.swimmingService.getCategories().subscribe(data => this.categories = data);
  }

  onSwimMetersChange(value: string) {
    this.isSwimmer = value === 'yes';
    if (!this.isSwimmer) {
      this.swimmingData.categorySelections = {};
      this.selectedCategoryOptions = [];
    }
    this.cdr.detectChanges();
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      this.selectedCategoryOptions = category.options.map((option: any) => option.name); // Agrega el tipo 'any' explícito
    }
    this.cdr.detectChanges();
  }

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

  checkMinSelection(categoryId: string) {
    this.minSelectionError = this.swimmingData.categorySelections[categoryId]?.length < 2;
  }

  onSubmit() {
    if (this.minSelectionError) {
      console.log('Please select at least two options.');
    } else {
      console.log('Form submitted successfully', this.swimmingData);
    }
  }
}
