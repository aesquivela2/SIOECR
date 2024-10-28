import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { AvailableDaysService, AvailableDay } from '../services/days.service';
import { TimeService, Time } from '../services/time.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { VolunteerService } from "./volunteer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-volunteer-form',
  standalone: true,
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    FormComponent
  ]
})
export class VolunteerFormComponent implements OnInit {
  isVolunteer = true;
  availableDays: AvailableDay[] = [];
  availableTimes: Time[] = [];
  selectedDays: number[] = [];
  selectedTimes: { [dayId: number]: number[] } = {}; // Dictionary to store times per day

  showValidationError = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    public formService: FormService,
    private availableDaysService: AvailableDaysService,
    private timeService: TimeService,
    private volunteerService: VolunteerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formService.setFormData({
      role: 'volunteer',
      availableDays: [],
      availableHours: {}
    });

    this.loadAvailableDays();
    this.loadAvailableTimes();
  }

  loadAvailableDays() {
    this.availableDaysService.getAllAvailableDays().subscribe(
      (days: AvailableDay[]) => {
        this.availableDays = days;
      },
      (error) => {
        console.error('Error loading available days:', error);
      }
    );
  }

  loadAvailableTimes() {
    this.timeService.getAllTimes().subscribe(
      (times: Time[]) => {
        this.availableTimes = times;
      },
      (error) => {
        console.error('Error loading available times:', error);
      }
    );
  }

  onDayChange(dayId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      // Add selected day
      this.selectedDays.push(dayId);
      this.selectedTimes[dayId] = [];
    } else {
      // Remove unselected day
      this.selectedDays = this.selectedDays.filter(id => id !== dayId);
      delete this.selectedTimes[dayId];
    }
    this.formService.setFormData({ availableDays: this.selectedDays });
  }

  onTimeChange(dayId: number, timeId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTimes[dayId].push(timeId);
    } else {
      this.selectedTimes[dayId] = this.selectedTimes[dayId].filter(id => id !== timeId);
    }
    this.formService.setFormData({ availableHours: this.selectedTimes });
  }

  isSelectionValid(): boolean {
    return this.selectedDays.length > 0 && Object.values(this.selectedTimes).some(times => times.length > 0);
  }

  nextStep() {
    this.formService.currentStep++;
  }

  previousStep() {
    this.formService.currentStep--;
  }

  onSubmit() {
    // Validación de selección de día y hora
    if (!this.isSelectionValid()) {
      this.showValidationError = true;
      this.successMessage = null;
      this.errorMessage = null;
      return;
    }

    // Ocultar el mensaje de error de validación si se cumple la selección
    this.showValidationError = false;

    const personalData = this.formService.getFormData();
    const availableDays = this.selectedDays.map(dayId => ({
      availableDay: {
        id: dayId,
        day_name: this.availableDays.find(day => day.id === dayId)?.day_name || ''
      },
      volunteer: { id: personalData.id }
    }));

    const availableHours = Object.entries(this.selectedTimes).map(([dayId, times]) => ({
      availableDay: {
        id: parseInt(dayId, 10),
        day_name: this.availableDays.find(day => day.id === parseInt(dayId, 10))?.day_name || ''
      },
      times: times.map(timeId => ({
        id: timeId,
        hour: this.availableTimes.find(time => time.id === timeId)?.hour || '',
        minutes: this.availableTimes.find(time => time.id === timeId)?.minutes || ''
      })),
      volunteer: { id: personalData.id }
    }));

    this.formService.setFormData({
      availableDays: availableDays,
      availableHours: availableHours
    });

    // Enviar formulario al backend
    this.volunteerService.createVolunteer(this.formService.getFormData()).subscribe(
      response => {
        this.successMessage = 'Registro de voluntario enviado exitosamente.';
        this.errorMessage = null;
        localStorage.setItem('successMessage', 'El voluntario fue registrado correctamente.');
        this.router.navigate(['/inicio']);
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Hubo un error al enviar el registro. Intente de nuevo.';
        console.error('Error submitting registration:', error);
      }
    );
  }
}
