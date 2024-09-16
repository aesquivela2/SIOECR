import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { PersonService } from './person.service';
import { RegionService } from './region.service';
import { Region } from '../app.component';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @ViewChild('personForm') personForm!: NgForm;  

  person = {
    identification: '',
    name: '',
    birthdate: '',
    email: '',
    phone_number: '',
    nationality: '',
    region: null
  };

  regions: Region[] = [];
  minDate: string = '';
  maxDate: string = '';
  invalidDate: boolean = false;  

  constructor(
    private personService: PersonService,
    private regionService: RegionService
  ) {}

  ngOnInit() {
    this.loadRegions();  
    this.minDate = '1900-01-01'; 
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; 
  }

  loadRegions() {
    this.regionService.getAllRegions().subscribe(
      (data: Region[]) => {
        this.regions = data;  
      },
      (error) => {
        console.error('Error fetching regions:', error);  
      }
    );
  }

  validateBirthdate() {
    const birthdate = new Date(this.person.birthdate);
    const today = new Date();
    const minDate = new Date(this.minDate);

    if (birthdate > today || birthdate < minDate || isNaN(birthdate.getTime())) {
      this.invalidDate = true;
    } else {
      this.invalidDate = false;
    }
  }

  onSubmit() {
    if (this.invalidDate) {
      alert(`La fecha de nacimiento debe estar entre ${this.minDate} y ${this.maxDate}.`);
      return;
    }

    if (this.personForm.form.valid) {
      this.personService.createPerson(this.person).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.person = {
            identification: '',
            name: '',
            birthdate: '',
            email: '',
            phone_number: '',
            nationality: '',
            region: null
          };
          this.personForm.resetForm();
        },
        error => {
          console.error('Error creating person:', error);
          alert('Ocurrió un error al enviar los datos.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}