import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { AvailableDaysService, AvailableDay } from '../services/days.service';
import { TimeService, Time } from '../services/time.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import {VolunteerService} from "./volunteer.service";

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
  selectedTimes: { [dayId: number]: number[] } = {};  // Dictionary to store times per day

  constructor(
    public formService: FormService,
    private availableDaysService: AvailableDaysService,
    private timeService: TimeService,
    private volunteerService: VolunteerService
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

  nextStep() {
    this.formService.currentStep++;
  }

  previousStep() {
    this.formService.currentStep--;
  }

  onSubmit() {
    const personalData= this.formService.getFormData();
    // Construye el arreglo completo de días disponibles, cada uno con la estructura completa
    const availableDays = this.selectedDays.map(dayId => ({
      availableDay: {
        id: dayId,
        day_name: this.availableDays.find(day => day.id === dayId)?.day_name || ''
      },
      volunteer: { id: this.formService.getFormData().id }
    }));

    // Construye el arreglo completo de horas seleccionadas para cada día
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
      volunteer: { id: this.formService.getFormData().id }
    }));

    // Preparar el objeto completo con toda la información
    this.formService.setFormData({
      availableDays: this.availableDays,
      availableHours: this.availableTimes
    });

    // Envía el formulario completo al backend
    this.volunteerService.createVolunteer(this.formService.getFormData()).subscribe(
      response => {
        console.log('Volunteer registration submitted:', response);
      },
      error => {
        console.error('Error submitting registration:', error);
      }
    );
  }



}
