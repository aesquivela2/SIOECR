import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { VolunteerService } from './volunteer.service';
import { SportService } from './sport.service';
import { Sport } from '../app.component';

interface AvailableDay {
  id: number;
  day_name: string;
}

@Component({
  selector: 'app-volunteer-form',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent implements OnInit {

  @ViewChild('volunteerForm') volunteerForm!: NgForm;  

  volunteer = {
    identification: '',
    name: '',
    birthdate: '',
    email: '',
    phone_number: '',
    nationality: '',
    sportExperience: null,
    availableDays: [] as { id: number, day_name: string, selected?: boolean }[], 
    availableTimes: {} as { [key: number]: string }
  };  

  sports: Sport[] = [];
  availableTimesList = [
    { hour: '08', minutes: '00' },
    { hour: '12', minutes: '00' },
    { hour: '16', minutes: '00' }
  ];

  constructor(
    private volunteerService: VolunteerService,
    private sportService: SportService
  ) {}

  ngOnInit() {
    this.loadSports();
    this.loadAvailableDays(); // Asegúrate de que los días disponibles se carguen
  }

  loadSports() {
    this.sportService.getAllSports().subscribe(
      (data: Sport[]) => {
        this.sports = data;
      },
      (error) => {
        console.error('Error fetching sports:', error);
      }
    );
  }

  loadAvailableDays() {
    this.volunteer.availableDays = [
      { id: 1, day_name: 'Lunes' },
      { id: 2, day_name: 'Martes' },
      { id: 3, day_name: 'Miércoles' },
      { id: 4, day_name: 'Jueves' },
      { id: 5, day_name: 'Viernes' },
      { id: 6, day_name: 'Sábado' },
      { id: 7, day_name: 'Domingo' }
    ];
  }  

  getDayName(day: AvailableDay): string {
    return day.day_name;
  }

  onSubmit() {
    if (this.volunteerForm.form.valid) {
      // Convertir la fecha a un objeto Date si es necesario
      if (this.volunteer.birthdate) {
        this.volunteer.birthdate = new Date(this.volunteer.birthdate).toISOString();
      }

      // Obtener solo los días seleccionados
      this.volunteer.availableDays = this.volunteer.availableDays
        .filter(day => day.selected)
        .map(day => ({ id: day.id, day_name: day.day_name }));

      // Enviar los datos al servicio
      this.volunteerService.createVolunteer(this.volunteer).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.volunteerForm.resetForm();
        },
        error => {
          console.error('Error creando voluntario:', error);
          alert('Ocurrió un error al enviar los datos.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  
}
