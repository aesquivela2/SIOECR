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
  isVolunteer = true;  // Set this flag to true for volunteer registration

  // Arrays for available days and times
  availableDays: AvailableDay[] = [];
  availableTimes: Time[] = [];

  // Selected days and times for each day
  selectedDays: number[] = [];
  selectedTimes: { [dayId: number]: number[] } = {};  // Dictionary to store times per day

  constructor(
    public formService: FormService,
    private availableDaysService: AvailableDaysService,
    private timeService: TimeService,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit(): void {
    // Set form data to track that this is a volunteer registration
    this.formService.setFormData({
      role: 'volunteer',
      availableDays: [],
      availableHours: {}
    });

    // Load available days and times from the services
    this.loadAvailableDays();
    this.loadAvailableTimes();
  }

  // Load available days
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

  // Load available times
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

  // Handle day selection change
  onDayChange(dayId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;  // Cast to HTMLInputElement to access `checked`
    if (isChecked) {
      // Add selected day
      this.selectedDays.push(dayId);
      this.selectedTimes[dayId] = [];  // Initialize an empty array for selected times for this day
    } else {
      // Remove unselected day
      this.selectedDays = this.selectedDays.filter(id => id !== dayId);
      delete this.selectedTimes[dayId];  // Remove times associated with this day
    }
    this.formService.setFormData({ availableDays: this.selectedDays });
  }

  // Handle time selection change for a specific day
  onTimeChange(dayId: number, timeId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;  // Cast to HTMLInputElement to access `checked`
    if (isChecked) {
      // Add selected time for the specific day
      this.selectedTimes[dayId].push(timeId);
    } else {
      // Remove unselected time for the specific day
      this.selectedTimes[dayId] = this.selectedTimes[dayId].filter(id => id !== timeId);
    }
    this.formService.setFormData({ availableHours: this.selectedTimes });
  }

  // Method to move to the next step
  nextStep() {
    this.formService.currentStep++;
  }

  // Method to move to the previous step
  previousStep() {
    this.formService.currentStep--;
  }

  // onSubmit method to handle form submission
  onSubmit() {
    console.log(this.formService.getFormData());  // Log form data to check the selected days and hours
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
