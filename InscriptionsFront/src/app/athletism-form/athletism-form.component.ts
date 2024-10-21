import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-athletism-form',
  templateUrl: './athletism-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./athletism-form.component.css']

})
export class AthletismFormComponent {
  selectedLevel: number = 0;
  selectedCategories: string[] = [];
  categories: string[] = [];

  // Categorías para cada nivel con firma de índice
  levelCategories: { [key: number]: string[] } = {
    1: ['25mts', '50mts', 'Lanzamiento de pelota de softball', 'Salto largo con impulso'],
    2: ['100mts', '200mts', 'Lanzamiento de bala', 'Salto largo con impulso'],
    3: ['400mts', '800mts', 'Lanzamiento de bala', 'Salto largo con impulso'],
    4: ['1500mts', '3000mts', '5000mts', 'Lanzamiento de bala', 'Salto largo con impulso'],
    5: ['25mts', '30mts', 'Lanzamiento de bola de softball (silla de ruedas)']
  };

  onLevelChange(event: any) {
    const level = +event.target.value;
    this.categories = this.levelCategories[level] || [];
    this.selectedCategories = [];
  }

  onCategoryChange(event: any) {
    const category = event.target.value;
    if (event.target.checked) {
      if (this.selectedCategories.length < 2) {
        this.selectedCategories.push(category);
      } else {
        event.target.checked = false;
      }
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  isDisabled(category: string): boolean {
    return this.selectedCategories.length >= 2 && !this.selectedCategories.includes(category);
  }
}
