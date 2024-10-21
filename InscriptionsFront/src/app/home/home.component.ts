import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',   // Path to the HTML file
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf


  ],
  // Path to the CSS file
})
export class HomeComponent {

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]); // Navigate to the desired route
  }

  currentMonth: number;
  currentYear: number;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { date: Date, isCurrentMonth: boolean, isToday: boolean }[] = [];

  constructor(private router: Router) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  successMessage: string | null = null;

  ngOnInit(): void {
    // Leer el mensaje de éxito desde localStorage
    this.successMessage = localStorage.getItem('successMessage');

    // Si hay un mensaje, mostrarlo y luego eliminarlo de localStorage
    if (this.successMessage) {
      setTimeout(() => {
        // Elimina el mensaje después de mostrarlo
        localStorage.removeItem('successMessage');
        this.successMessage = null;
      }, 5000); // El mensaje se muestra durante 5 segundos
    }
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    this.calendarDays = [];

    // Add days from previous month to fill empty slots
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const today = new Date();
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        isCurrentMonth: true,
        isToday: today.getDate() === i && today.getMonth() === this.currentMonth && today.getFullYear() === this.currentYear
      });
    }

    // Add days from next month to fill remaining slots
    const remainingSlots = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingSlots; i++) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDate(date: Date) {
    alert('Selected date: ' + date.toDateString());
  }

  get monthName(): string {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[this.currentMonth];
  }
}
